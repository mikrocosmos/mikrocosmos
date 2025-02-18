"use server";

import { TCheckoutForm } from "@/shared/constants";
import { cookies } from "next/headers";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { getUserSession } from "@/shared/lib/getUserSession";
import axios from "axios";

export async function createOrder(data: TCheckoutForm) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;
    if (!cartToken) {
      throw new Error("Cart token not found");
    }
    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        items: true,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }
    if (userCart?.totalPrice === 0) {
      throw new Error("Cart is empty");
    }
    if (!data.userId) {
      throw new Error("[actions/createOrder] 401 Unauthorized");
    }

    const date = new Date();
    const createdAt = date.setHours(date.getHours() + 5);

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        userId: data.userId,
        fullName: data.name,
        phone: data.phone,
        email: data.email,
        comment: data.comment,
        codeWord: data.codeWord,
        totalPrice: userCart.totalPrice,
        status: OrderStatus.PENDING,
        branchId: Number(data.branch),
        createdAt: new Date(createdAt),
      },
    });

    await prisma.orderedProducts.createMany({
      data: userCart.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalPrice: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const orderWithProducts = await prisma.order.findFirst({
      where: { id: order.id },
      include: {
        user: true,
        branch: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!orderWithProducts) {
      throw new Error("Что-то пошло не так");
    }
    const botToken = process.env.TELEGRAM_TOKEN;
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const messageText = `Пришёл заказ на филиал ${orderWithProducts.branch.address}, на сумму ${orderWithProducts.totalPrice} руб.

Покупатель:
- Имя: ${orderWithProducts.user.name}
- Телефон: ${orderWithProducts.user.phone}
- Email: ${orderWithProducts.user.email}

Товары:
${orderWithProducts.items
  .map(
    (item) => ` 
- Название: ${item.product.name}
- Количество: ${item.quantity}
- Цена: ${item.product.price} руб.
`,
  )
  .join("")}
`;

    await axios.post(telegramUrl, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: messageText,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Заказ на сайте",
              url: `https://smokymoon.ru/admin/orders/${order.id}`,
            },
          ],
        ],
      },
    });

    userCart.items.forEach(async (item) => {
      await prisma.branchToProduct.update({
        where: {
          branchId_productId: {
            branchId: Number(data.branch),
            productId: item.productId,
          },
        },
        data: {
          totalQuantity: {
            decrement: item.quantity,
          },
        },
      });
    });

    return "/order/" + order.id;
  } catch (error) {
    console.error("[actions/createOrder] Server error", error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.log("[actions/updateUserInfo] Server error", error);
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw new Error("User already exists");
    }

    const createdUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashSync(body.password as string, 10),
        role: body.email === "web@mikrocosmos.ru" ? "ADMIN" : "USER",
        currentBranchId: 1,
      },
    });

    return createdUser;
  } catch (error) {
    console.log("[actions/registerUser] Server error", error);
  }
}

export async function setCookie(key: string, value: string) {
  const cookieStore = cookies();
  cookieStore.set(key, value);
}

export async function changeBranch(currentBranchId: number) {
  const user = await getUserSession();

  if (!user) {
    return;
  }
  await prisma.user.update({
    where: {
      id: Number(user.id),
    },
    data: {
      currentBranchId,
    },
  });
}

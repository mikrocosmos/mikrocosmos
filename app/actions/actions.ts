"use server";

import { TCheckoutForm } from "@/shared/constants";
import { cookies } from "next/headers";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { getUserSession } from "@/shared/lib/getUserSession";

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
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!userCart) {
      throw new Error("Cart not found");
    }
    if (userCart?.totalPrice === 0) {
      throw new Error("Cart is empty");
    }

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
        items: JSON.stringify(userCart.items),
      },
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
  const cookieStore = await cookies();
  cookieStore.set(key, value);
  return cookieStore;
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

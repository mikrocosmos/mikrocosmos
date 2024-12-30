import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { findOrCreateCart, updateCartTotal } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/getUserSession";

export async function GET(req: NextRequest) {
  try {
    const token = await req.cookies.get("cartToken")?.value;

    if (!token) return NextResponse.json({ totalPrice: 0, items: [] });
    const session = await getUserSession();
    let userCart;

    if (session) {
      userCart = await prisma.cart.findFirst({
        where: {
          OR: [{ userId: Number(session!.id) }],
        },
        include: {
          items: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              product: true,
            },
          },
        },
      });
    } else {
      userCart = await prisma.cart.findFirst({
        where: {
          OR: [{ token }],
        },
        include: {
          items: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              product: true,
            },
          },
        },
      });
    }

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[CART_GET] Server error", error);
    return NextResponse.json(
      { message: "Не удалось получить корзину" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const data = await req.json();

    let findUser;

    if (data.userId) {
      findUser = await prisma.user.findFirst({
        where: {
          id: data.userId,
        },
      });
    }

    const userCart = await findOrCreateCart(token, findUser?.id);

    if (findUser) {
      token = userCart.token;
    }

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productId: data.productId,
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: data.productId,
          quantity: 1,
        },
      });
    }
    const updatedUserCart = await updateCartTotal(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("cartToken", token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return resp;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json(
      { message: "Не удалось добавить в корзину" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) return NextResponse.json({ totalPrice: 0, items: [] });

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            product: true,
          },
        },
      },
    });

    if (!userCart) {
      return NextResponse.json({ totalPrice: 0, items: [] });
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const updatedUserCart = await updateCartTotal(token);
    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("cartToken", token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return resp;
  } catch (error) {
    console.log("[CART_DELETE] Server error", error);
    return NextResponse.json(
      { message: "Не удалось удалить из корзины" },
      { status: 500 },
    );
  }
}

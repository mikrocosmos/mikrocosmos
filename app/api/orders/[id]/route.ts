import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { CartItem, OrderStatus } from "@prisma/client";

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  try {
    const params = await props.params;
    const id = Number(params.id);
    const data = await req.json();

    const status: OrderStatus = data.status;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        items: true,
      },
    });

    if (!order) return NextResponse.json("Order not found", { status: 404 });

    const items = order.items;

    if (items.length > 0 && status === "CANCELED") {
      for (const item of items) {
        await prisma.branchToProduct.update({
          where: {
            branchId_productId: {
              branchId: order.branchId,
              productId: item.productId,
            },
          },
          data: {
            totalQuantity: {
              increment: item.quantity,
            },
          },
        });
      }
    }

    await prisma.order.update({
      where: {
        id,
      },
      data: {
        token: data.token,
        totalPrice: data.totalPrice,
        status: data.status,
        branchId: data.branchId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        comment: data.comment,
        codeWord: data.codeWord,
        userId: data.userId,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error("[ORDER_PATCH] Server error", error);
    return NextResponse.json(null, { status: 500 });
  }
}

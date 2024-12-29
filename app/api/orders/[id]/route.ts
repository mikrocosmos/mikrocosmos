import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    const data = await req.json();
    const order = await prisma.order.update({
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

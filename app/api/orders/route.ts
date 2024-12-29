import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const branchId = req.nextUrl.searchParams.get("branch") || "";
  const orders = await prisma.order.findMany({
    where: {
      branch: {
        id: Number(branchId),
      },
    },
    include: {
      branch: true,
    },
  });
  return NextResponse.json(orders);
}

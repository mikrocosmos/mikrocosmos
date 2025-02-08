import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const productVary = await prisma.productVary.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
    },
  });
  return NextResponse.json(productVary);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("post subcategory", data);
}

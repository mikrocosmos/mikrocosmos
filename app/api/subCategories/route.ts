import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const subCategories = await prisma.subCategory.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      category: true,
    },
  });
  return NextResponse.json(subCategories);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("post subcategory", data);
}

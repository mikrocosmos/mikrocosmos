import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { getCategoryLastIndex } from "@/shared/lib/getCategoryLastIndex";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const findCategory = await prisma.category.findFirst({
    where: {
      name: data.name,
    },
  });

  if (findCategory) {
    return NextResponse.json(
      { error: "Category already exists" },
      { status: 400 },
    );
  }

  const allCategories = await prisma.category.findMany({
    orderBy: {
      order: "asc",
    },
  });

  const lastIndex = getCategoryLastIndex(allCategories);

  const category = await prisma.category.create({
    data: {
      name: data.name,
      order: data.order || lastIndex + 1,
    },
  });

  return NextResponse.json(category);
}

import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany();
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

  const category = await prisma.category.create({
    data: {
      name: data.name,
    },
  });
  return NextResponse.json(category);
}

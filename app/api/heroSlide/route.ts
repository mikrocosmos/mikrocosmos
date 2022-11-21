import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const heroSlide = await prisma.heroSlide.findMany();
  return NextResponse.json(heroSlide);
}

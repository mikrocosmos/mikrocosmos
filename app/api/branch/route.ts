import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const branch = await prisma.branch.findMany();
  return NextResponse.json(branch);
}

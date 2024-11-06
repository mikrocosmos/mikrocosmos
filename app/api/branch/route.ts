import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const branch = await prisma.branch.findMany();
  return NextResponse.json(branch);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const findBranch = await prisma.branch.findFirst({
    where: {
      address: data.address,
    },
  });

  if (findBranch) {
    return NextResponse.json(
      { error: "Branch already exists" },
      { status: 400 },
    );
  }

  const branch = await prisma.branch.create({
    data: {
      address: data.address,
      phone: data.phone,
      opensAt: data.opensAt,
      closesAt: data.closesAt,
      daysOpen: data.daysOpen,
    },
  });
  return NextResponse.json(branch);
}

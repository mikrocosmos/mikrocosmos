import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { hashSync } from "bcrypt";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const findUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (findUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashSync(data.password, 10),
      role: data.role || "USER",
    },
  });
  return NextResponse.json(user);
}

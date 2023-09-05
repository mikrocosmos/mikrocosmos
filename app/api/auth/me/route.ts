import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/getUserSession";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUserSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: +user.id,
      },
      select: {
        name: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "[USER_GET] Server error" },
      { status: 500 }
    );
  }
}

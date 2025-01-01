"use server";

import { Prisma, UserRole } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { prisma } from "@/prisma/prisma-client";

export async function updateUserInfo(id: number, body: Prisma.UserUpdateInput) {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        role: body.role as UserRole,
        password: body.password
          ? hashSync(String(body.password), 12)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.log("[actions/updateUserInfo] Server error", error);
  }
}

export async function deleteUser(id: number) {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.order.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.log("[actions/deleteUser] Server error", error);
  }
}

export async function createUser(body: Prisma.UserCreateInput) {
  try {
    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        password: hashSync(body.password as string, 12),
        role: body.role as UserRole,
        currentBranchId: body.currentBranchId,
      },
    });
  } catch (error) {
    console.log("[actions/createUser] Server error", error);
  }
}

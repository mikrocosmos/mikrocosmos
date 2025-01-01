"use server";

import { prisma } from "@/prisma/prisma-client";
import { TFormBranchValues } from "@/shared/components/admin/branches/schema";

export async function deleteBranch(id: number) {
  try {
    const branch = await prisma.branch.findFirst({
      where: {
        id,
      },
    });

    if (!branch) {
      throw new Error("Branch not found");
    }

    await prisma.branchToProduct.deleteMany({
      where: {
        branchId: id,
      },
    });

    await prisma.order.deleteMany({
      where: {
        branchId: id,
      },
    });

    await prisma.branch.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log("[actions/deleteBranch] Server error", error);
  }
}

export async function updateBranch(id: number, data: TFormBranchValues) {
  try {
    await prisma.branch.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.log("[actions/updateBranch] Server error", error);
  }
}

export async function createBranch(data: TFormBranchValues) {
  try {
    const newBranch = await prisma.branch.create({
      data,
    });

    const products = await prisma.product.findMany();

    await prisma.branchToProduct.createMany({
      data: products.map((product) => ({
        branchId: newBranch.id,
        productId: product.id,
        totalQuantity: 0,
      })),
    });
  } catch (error) {
    console.log("[actions/createBranch] Server error", error);
  }
}

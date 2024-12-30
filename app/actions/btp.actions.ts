"use server";
import { prisma } from "@/prisma/prisma-client";

export async function getBtp(productId?: number, branchId?: number) {
  if (productId) {
    return prisma.branchToProduct.findMany({
      where: {
        productId,
      },
    });
  }
  if (branchId) {
    return prisma.branchToProduct.findMany({
      where: {
        branchId,
      },
    });
  }
  if (productId && branchId) {
    return prisma.branchToProduct.findMany({
      where: {
        productId,
        branchId,
      },
    });
  }
  return prisma.branchToProduct.findMany();
}

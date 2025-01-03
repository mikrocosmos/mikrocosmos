"use server";
import { prisma } from "@/prisma/prisma-client";

export async function getOrders(branchId: number, searchValue?: string) {
  if (!searchValue) {
    return prisma.order.findMany({
      where: {
        branchId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return prisma.order.findMany({
    where: {
      branchId,
      OR: [
        {
          fullName: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
        {
          comment: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
        {
          id: {
            equals: !isNaN(Number(searchValue))
              ? Number(searchValue)
              : undefined,
          },
        },
        {
          totalPrice: {
            equals: !isNaN(Number(searchValue))
              ? Number(searchValue)
              : undefined,
          },
        },
        {
          codeWord: {
            contains: searchValue,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

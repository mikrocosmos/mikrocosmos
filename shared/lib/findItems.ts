import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  limit?: number;
  branches?: string;
  min?: string;
  max?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000;

export const findItems = async (id: number, params: GetSearchParams) => {
  const branches = params.branches?.split(",").map(Number);
  const minPrice = Number(params?.min) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params?.max) || DEFAULT_MAX_PRICE;

  return prisma.category.findFirst({
    where: { id: Number(id) },
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          branchIds: branches ? { hasSome: branches } : undefined,
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
        take: Number(params?.limit) || 80,
      },
    },
  });
};

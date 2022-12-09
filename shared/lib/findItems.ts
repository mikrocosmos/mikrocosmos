import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  limit?: number;
  min?: string;
  max?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000;

export const findItems = async (params?: GetSearchParams) => {
  const minPrice = Number(params?.min) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params?.max) || DEFAULT_MAX_PRICE;

  return prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
        take: Number(params?.limit) || 3,
      },
    },
  });
};

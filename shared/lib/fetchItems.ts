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

export const fetchItems = async () => {
  return prisma.subCategory.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          price: {
            gte: DEFAULT_MIN_PRICE,
            lte: DEFAULT_MAX_PRICE,
          },
        },
        take: 3,
      },
    },
  });
};

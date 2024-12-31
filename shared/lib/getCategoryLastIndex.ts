import { prisma } from "@/prisma/prisma-client";

export const getCategoryLastIndex = async () => {
  const allCategories = await prisma.category.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return allCategories.reduce((acc, curr) =>
    acc.order > curr.order ? acc : curr,
  ).order;
};

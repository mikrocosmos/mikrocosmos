import { Category, SubCategory } from "@prisma/client";

export const getCategoryLastIndex = (array: Category[] | SubCategory[]) => {
  return array.reduce((acc, curr) => (acc.order > curr.order ? acc : curr))
    .order;
};

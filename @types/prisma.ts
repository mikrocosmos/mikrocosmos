import { Branch, BranchToProduct, Category, Product } from "@prisma/client";

export type ProductWithCategory = Product & { category: Category };

export type ProductWithCategoryAndBranch = Product & {
  category: Category;
  branchIds: BranchToProduct[];
};

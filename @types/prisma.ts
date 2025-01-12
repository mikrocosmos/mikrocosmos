import {
  BranchToProduct,
  Category,
  Product,
  SubCategory,
} from "@prisma/client";

export type ProductWithSubCategory = Product & {
  subCategory: SubCategory & { category: Category };
};

export type ProductWithSubCategoryAndBranch = Product & {
  subCategory: SubCategory & { category: Category };
  branchIds: BranchToProduct[];
};

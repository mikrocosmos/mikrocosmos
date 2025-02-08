import {
  BranchToProduct,
  Category,
  Product,
  ProductVary,
  SubCategory,
} from "@prisma/client";

export type ProductWithSubCategory = Product & {
  vary: ProductVary & {
    subCategory: SubCategory & { category: Category };
  };
};

export type ProductWithSubCategoryAndBranch = Product & {
  vary: ProductVary & {
    subCategory: SubCategory & { category: Category };
  };
  branchIds: BranchToProduct[];
};

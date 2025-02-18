import {
  Branch,
  BranchToProduct,
  Category,
  Order,
  OrderedProducts,
  Product,
  ProductVary,
  SubCategory,
  User,
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

export type OrderDetails = Order & {
  branch: Branch;
  user: User;
  items: (OrderedProducts & {
    product: Product;
  })[];
};

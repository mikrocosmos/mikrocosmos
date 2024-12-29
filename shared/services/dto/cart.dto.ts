import { Branch, Cart, CartItem, Product } from "@prisma/client";

export interface CartItemDTO extends CartItem {
  product: Product;
  branchIds: Branch[];
}

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productId: number;
  userId?: number;
  branchIds?: number[];
}

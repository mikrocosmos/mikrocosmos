import { Cart, CartItem, Product } from "@prisma/client";

export interface CartItemDTO extends CartItem {
  product: Product;
  branchId: number;
}

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productId: number;
  userId?: number;
  branchId?: number;
}

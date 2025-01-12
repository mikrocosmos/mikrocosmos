import { useCartStore } from "@/shared/store";
import React from "react";
import { CartStateItem } from "@/shared/lib/getCartDetails";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

type ReturnProps = {
  totalPrice: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
  cleanCart: () => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};

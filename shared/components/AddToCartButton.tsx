"use client";
import React from "react";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui";
import { toastError, toastSuccess } from "@/shared/constants";

interface Props {
  productId?: number;
  branchIds?: number[];
  variant?:
    | "default"
    | "outline"
    | "outline_red"
    | "outline_accent"
    | "white_accent"
    | "white_red"
    | null;
  className?: string;
}

export const AddToCartButton: React.FC<Props> = ({
  productId,
  branchIds,
  variant = "outline_accent",
  className,
}) => {
  const [loading, addCartItem] = useCartStore((state) => [
    state.loading,
    state.addCartItem,
  ]);

  const onSubmit = async (productId?: number, branchIds?: number[]) => {
    try {
      await addCartItem({
        productId,
        branchIds,
      });
      toast("Товар добавлен в корзину", toastSuccess);
    } catch (error) {
      toast("Не удалось добавить товар в корзину", toastError);
      console.error(error);
    }
  };

  return (
    <Button
      variant={variant}
      loading={loading}
      onClick={() => onSubmit?.(productId, branchIds)}
      className={className}
    >
      В корзину
    </Button>
  );
};

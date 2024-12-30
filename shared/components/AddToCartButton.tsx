"use client";
import React from "react";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui";
import { toastError, toastSuccess } from "@/shared/constants";
import { useSession } from "next-auth/react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  productId?: number;
  branchId?: number;
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
  branchId,
  variant = "outline_accent",
  className,
  ...props
}) => {
  const [loading, addCartItem] = useCartStore((state) => [
    state.loading,
    state.addCartItem,
  ]);

  const session = useSession();

  const userId = Number(session.data?.user?.id);

  const onSubmit = async (
    productId?: number,
    userId?: number,
    branchId?: number,
  ) => {
    try {
      await addCartItem({
        productId,
        userId,
        branchId,
      });
      toast("Товар добавлен в корзину", toastSuccess);
    } catch (error) {
      toast("Не удалось добавить товар в корзину", toastError);
      console.error(error);
    }
  };

  return (
    <Button
      {...props}
      variant={variant}
      loading={loading}
      onClick={() => onSubmit?.(productId, userId, branchId)}
      className={className}
    >
      В корзину
    </Button>
  );
};

"use client";
import React from "react";
import { branchStore, useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui";
import { toastError, toastSuccess } from "@/shared/constants";
import { useSession } from "next-auth/react";
import { getBtp } from "@/app/actions/btp.actions";
import { BranchToProduct } from "@prisma/client";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  productId: number;
  btps: BranchToProduct[];
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
  btps,
  variant = "outline_accent",
  className,
  ...props
}) => {
  const [loading, addCartItem, items] = useCartStore((state) => [
    state.loading,
    state.addCartItem,
    state.items,
  ]);
  const [maxQuantity, setMaxQuantity] = React.useState(0);

  const { branchId } = branchStore((state) => state);

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

  const currentQuantity = items.find(
    (item) => item.productId === productId,
  )?.quantity;

  React.useEffect(() => {
    const currentBtp = btps.find(
      (item) => item.branchId === branchId && item.productId === productId,
    );
    if (currentBtp) {
      setMaxQuantity(currentBtp.totalQuantity);
    }
  }, [branchId, btps, maxQuantity, productId]);

  return (
    <Button
      {...props}
      variant={variant}
      loading={loading}
      disabled={
        (currentQuantity !== undefined && currentQuantity >= maxQuantity) ||
        maxQuantity <= 0
      }
      onClick={() => onSubmit?.(productId, userId, branchId)}
      className={className}
    >
      В корзину
    </Button>
  );
};

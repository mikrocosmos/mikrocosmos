"use client";
import React from "react";
import { CartItemProps } from "@/shared/components/cart-item-details/cart-item-details.types";
import { cn } from "@/shared/lib/utils";
import * as CartItem from "@/shared/components/cart-item-details/";
import Link from "next/link";
import { CircleX } from "lucide-react";
import { useMaxQuantity } from "@/shared/hooks/useMaxQuantity";
interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutCartItem: React.FC<Props> = ({
  name,
  disabled,
  price,
  description,
  quantity,
  productId,
  imageUrl,
  onClickRemove,
  onClickCountButton,
  className,
}) => {
  const maxQuantity = useMaxQuantity(productId);
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row gap-2 lg:gap-0 mb-4 items-center justify-between",
        { "opacity-50 pointer-events-none": disabled },
        className,
      )}
    >
      <Link
        href={`/product/${productId}`}
        className="flex flex-col lg:flex-row items-center gap-5 flex-1"
      >
        <CartItem.Image src={imageUrl} />
        <CartItem.Info name={name} description={description} />
      </Link>
      <CartItem.Price value={price} className="ml-5" />

      <div className="flex items-center gap-5 ml-5">
        <CartItem.CountButton
          maxQuantity={maxQuantity}
          onClick={onClickCountButton}
          value={quantity}
        />
        <button type="button" onClick={onClickRemove}>
          <CircleX
            className="cursor-pointer text-destructive hover:text-destructive-foreground"
            size={30}
          />
        </button>
      </div>
    </div>
  );
};

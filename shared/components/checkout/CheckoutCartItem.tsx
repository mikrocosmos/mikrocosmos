import React from "react";
import { CartItemProps } from "@/shared/components/cart-item-details/cart-item-details.types";
import { cn } from "@/shared/lib/utils";
import * as CartItem from "@/shared/components/cart-item-details/";
import Link from "next/link";
import { on } from "react-use/lib/misc/util";
import { CircleX } from "lucide-react";

interface Props {
  className?: string;
}

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutCartItem: React.FC<Props> = ({
  name,
  disabled,
  id,
  price,
  description,
  quantity,
  productId,
  imageUrl,
  onClickRemove,
  onClickCountButton,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        { "opacity-50 pointer-events-none": disabled },
        className,
      )}
    >
      <Link
        href={`/product/${productId}`}
        className="flex items-center gap-5 flex-1"
      >
        <CartItem.Image src={imageUrl} />
        <CartItem.Info name={name} description={description} />
      </Link>
      <CartItem.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItem.CountButton onClick={onClickCountButton} value={quantity} />
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

import { CircleX } from "lucide-react";
import { CartItemProps } from "@/shared/components/cart-item-details/cart-item-details.types";
import * as CartItem from "@/shared/components/cart-item-details/";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

interface Props extends CartItemProps {
  onClickCountButton: (type: "plus" | "minus") => void;
  onRemove: () => void;
  className?: string;
}

export const CartDrawerItem = ({
  name,
  description,
  imageUrl,
  productId,
  disabled,
  quantity,
  price,
  onClickCountButton,
  onRemove,
  className,
}: Props) => {
  return (
    <div
      className={cn(className, "flex bg-white p-5 gap-6 mb-2", {
        "opacity-50 pointer-events-none": disabled,
      })}
    >
      <Link href={`/product/${productId}`}>
        <CartItem.Image src={imageUrl} />
      </Link>

      <div className="flex-1">
        <Link href={`/product/${productId}`}>
          <CartItem.Info name={name} description={description} />
        </Link>

        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CartItem.CountButton
            onClick={(type) => onClickCountButton(type)}
            value={quantity}
          />
          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <CircleX
              onClick={onRemove}
              className="cursor-pointer text-gray-400 hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

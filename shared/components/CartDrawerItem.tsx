import { CircleX } from "lucide-react";
import { CartItemProps } from "@/shared/components/cart-item-details/cart-item-details.types";
import * as CartItem from "@/shared/components/cart-item-details/";
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
      className={cn(className, "flex bg-background p-5 gap-6 mb-2", {
        "opacity-50 pointer-events-none": disabled,
      })}
    >
      <a href={`/product/${productId}`}>
        <CartItem.Image src={imageUrl} />
      </a>

      <div className="flex-1 flex flex-col justify-between">
        <a href={`/product/${productId}`}>
          <CartItem.Info name={name} description={description} />
        </a>

        <div className="flex items-center justify-between mt-3">
          <CartItem.CountButton
            onClick={(type) => onClickCountButton(type)}
            value={quantity}
          />
          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <CircleX
              onClick={onRemove}
              className="cursor-pointer text-destructive hover:text-destructive-foreground"
              size={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

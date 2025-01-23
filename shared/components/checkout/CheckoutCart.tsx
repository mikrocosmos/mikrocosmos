"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import * as Checkout from "./index";
import { useCart } from "@/shared/hooks";
import { Trash2Icon } from "lucide-react";

interface Props {
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ className }) => {
  const { items, updateItemQuantity, removeCartItem, cleanCart } = useCart();
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    updateItemQuantity(id, quantity + (type === "plus" ? 1 : -1));
  };
  return (
    <Checkout.Block title="Корзина" className={cn("relative", className)}>
      {items.length > 0 && (
        <div
          onClick={cleanCart}
          className="absolute top-[25px] right-5 flex items-center text-gray-100 cursor-pointer transition hover:text-primary"
        >
          <Trash2Icon size={16} className="mr-2 -mt-[2px]" />
          Очистить корзину
        </div>
      )}
      <div className="flex flex-col gap-5">
        {items.length > 0 ? (
          items.map((item) => (
            <Checkout.CartItem
              key={item.id}
              {...item}
              onClickCountButton={(type) =>
                onClickCountButton(item.id, item.quantity, type)
              }
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))
        ) : (
          <div>Ничего нет</div>
        )}
      </div>
    </Checkout.Block>
  );
};

"use client";
import React from "react";
import { CheckoutBlock } from "@/shared/components/checkout/CheckoutBlock";
import * as Checkout from "./index";
import { Button, Skeleton } from "@/shared/components/ui";
import { ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useCart } from "@/shared/hooks";

interface Props {
  submitting?: boolean;
  className?: string;
}

export const CheckoutTotal: React.FC<Props> = ({
  className,
  submitting = false,
}) => {
  const { totalPrice, loading } = useCart();

  const taxes = +(totalPrice * 0.05).toFixed(2);
  const delivery = totalPrice > 0 ? 250 : 0;
  const totalAmount = totalPrice + taxes + delivery;
  const skeletonClassName = "w-full h-6 my-4";

  return (
    <CheckoutBlock className={cn(className, "p-6 sticky top-4")}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className="text-[34px] font-extrabold">{totalAmount} ₽</span>
        )}
      </div>
      {loading ? (
        <>
          <Skeleton className={skeletonClassName} />
          <Skeleton className={skeletonClassName} />
          <Skeleton className={skeletonClassName} />
        </>
      ) : (
        <>
          <Checkout.TotalItem title="Стоимость товаров" value={totalPrice} />
          <Checkout.TotalItem title="Налоги" value={taxes} />
          <Checkout.TotalItem title="Доставка" value={delivery} />
        </>
      )}
      <Button
        type="submit"
        variant="white_accent"
        disabled={totalPrice === 0}
        loading={submitting}
        className={cn("w-full mt-4", {
          "cursor-not-allowed": totalPrice === 0,
        })}
      >
        Оформить заказ
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </CheckoutBlock>
  );
};

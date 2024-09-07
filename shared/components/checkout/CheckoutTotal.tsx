"use client";
import React from "react";
import * as Checkout from "./index";
import { Button, Skeleton } from "@/shared/components/ui";
import { ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useCart } from "@/shared/hooks";
import { Checkbox } from "@/shared/components/ui/checkbox";
import Link from "next/link";

interface Props {
  submitting?: boolean;
  className?: string;
}

export const CheckoutTotal: React.FC<Props> = ({
  className,
  submitting = false,
}) => {
  const { totalPrice, loading } = useCart();
  const [terms, setTerms] = React.useState(false);

  return (
    <Checkout.Block className={cn(className, "p-6 sticky top-4")}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className="text-[34px] font-bold">{totalPrice} ₽</span>
        )}
      </div>
      <div>
        <p>
          Ознакомиться с зарезервированным товаром вы сможете только при личном
          посещении розничного магазина.&nbsp;
          <strong>
            При получении заказа потребуется подтверждение совершеннолетия.
          </strong>
        </p>
        <div className="flex items-center space-x-4 mt-4 ">
          <Checkbox id="terms" onCheckedChange={() => setTerms(!terms)} />
          <label htmlFor="terms" className="cursor-pointer">
            Я даю согласие на&nbsp;
            <Link
              className="text-primary transition hover:text-secondary"
              href="/privacy"
            >
              обработку персональных данных
            </Link>
          </label>
        </div>
      </div>
      <Button
        type="submit"
        variant="white_accent"
        disabled={totalPrice === 0 || !terms}
        loading={submitting}
        className={cn("w-full mt-4", {
          "cursor-not-allowed": totalPrice === 0,
        })}
      >
        Оформить заказ
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </Checkout.Block>
  );
};

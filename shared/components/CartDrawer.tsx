"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { ArrowLeft, X } from "lucide-react";
import { CartDrawerItem } from "@/shared/components/CartDrawerItem";
import Image from "next/image";
import { Title } from "@/shared/components/Title";
import { useCart } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const { totalPrice, updateItemQuantity, removeCartItem, items, cleanCart } =
    useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    updateItemQuantity(id, quantity + (type === "plus" ? 1 : -1));
  };
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-popover border-none h-full w-full">
        <SheetHeader className="text-left flex-row justify-between items-center">
          <SheetTitle className="text-2xl font-bold">Корзина</SheetTitle>
          <SheetClose>
            <X size={30} />
          </SheetClose>
        </SheetHeader>

        {totalPrice > 0 ? (
          <>
            <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  productId={item.productId}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
            <SheetFooter className="-mx-6 bg-background p-8">
              <div className="w-full">
                <div className="flex items-center mb-4">
                  <span className="flex flex-1 text-lg">
                    Итого
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>

                  <span className="font-bold text-xl text-primary">
                    {totalPrice} ₽
                  </span>
                </div>

                <Button
                  onClick={cleanCart}
                  className="w-full h-12 text-base mb-2"
                  variant="outline_red"
                >
                  Очистить корзину
                </Button>
                <Link href="/checkout">
                  <Button
                    variant="white_accent"
                    type="submit"
                    className="w-full h-12 text-base"
                  >
                    Оформить заказ
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col flex-1 items-center justify-center w-72 mx-auto">
            <Image
              src="/assets/images/not-found.png"
              alt="Empty cart"
              width={150}
              height={150}
            />
            <Title
              text="Корзина пустая"
              size="sm"
              className="text-center font-bold my-2"
            />
            <p className="text-center text-neutral-500 mb-5">
              Добавьте что-нибудь в корзину, чтобы совершить заказ
            </p>
            <SheetClose>
              <Button
                variant="white_accent"
                className="flex justify-center items-center"
              >
                <ArrowLeft size={20} className="mr-2" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

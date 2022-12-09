"use client";
import React from "react";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { cn } from "@/shared/lib/utils";
import { className } from "postcss-selector-parser";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Title } from "@/shared/components/Title";
import { Button } from "@/shared/components/ui";

interface Props {
  product: Product;
}

export const ProductForm: React.FC<Props> = ({ product }) => {
  const [loading, addCartItem] = useCartStore((state) => [
    state.loading,
    state.addCartItem,
  ]);

  const onSubmit = async (productId?: number, branchIds?: number[]) => {
    try {
      await addCartItem({
        productId,
        branchIds: [product.branchId],
      });
      toast.success(`Товар добавлен в корзину`);
    } catch (error) {
      toast.error(`Не удалось добавить товар в корзину`);
      console.error(error);
    }
  };

  return (
    <div className={cn("flex flex-1", className)}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
      />
      <div className="w-[750px] p-7">
        <Title text={product.name} size="md" className="font-extrabold mb-1" />
        <p>{product.description}</p>
        <Button
          variant="white_accent"
          loading={loading}
          onClick={() => onSubmit?.(product.id)}
          className="h-[55px] px-10 mt-4 text-base rounded-[18px] w-full"
        >
          Добавить в корзину за {product.price} ₽
        </Button>
      </div>
    </div>
  );
};

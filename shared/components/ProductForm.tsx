"use client";
import React from "react";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { cn } from "@/shared/lib/utils";
import { className } from "postcss-selector-parser";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Title } from "@/shared/components/";
import { Button } from "@/shared/components/ui";
import { AddToCartButton } from "@/shared/components/";

interface Props {
  product: Product;
}

export const ProductForm: React.FC<Props> = ({ product }) => {
  const loading = useCartStore((state) => state.loading);

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
        <AddToCartButton
          productId={product.id}
          branchIds={product.branchIds}
          className="h-[55px] px-10 mt-4 text-base rounded-[18px] w-full"
        />
      </div>
    </div>
  );
};

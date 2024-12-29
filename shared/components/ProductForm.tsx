"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { className } from "postcss-selector-parser";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Title } from "@/shared/components/";
import { AddToCartButton } from "@/shared/components/";
import { useBranches } from "../hooks";
import { Skeleton } from "./ui";

interface Props {
  product: Product;
}

export const ProductForm: React.FC<Props> = ({ product }) => {
  const { branch, loading } = useBranches();

  return (
    <div
      className={cn(
        "flex flex-1 flex-col justify-center items-center gap-5 md:items-start md:justify-normal md:flex-row mt-5",
        className,
      )}
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-3xl object-cover w-[500px] h-[500px] bg-white"
      />
      <div>
        <Title text={product.name} size="lg" className="font-bold mb-1" />
        {loading ? (
          <>
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-32 h-5 mt-5" />
          </>
        ) : (
          product.branchIds.map((item, index) => (
            <p
              key={item}
              className="before:inline-block before:rounded-full before:mr-[10px] before:bg-success before:w-[10px] before:h-[10px]"
            >
              {branch[item - 1].address}
            </p>
          ))
        )}

        <div className="flex items-center justify-between md:justify-normal gap-5 mt-5">
          <p className="text-3xl text-primary font-bold">{product.price} ₽</p>
          <AddToCartButton
            variant={"white_accent"}
            productId={product.id}
            branchIds={product.branchIds}
          />
        </div>
        {product.description && (
          <div className="my-5">
            <Title size="md" text="Описание" className="font-bold" />
            <p className="text-lg mt-2">{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

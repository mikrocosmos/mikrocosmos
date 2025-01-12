"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { className } from "postcss-selector-parser";
import { BranchToProduct, Product } from "@prisma/client";
import Image from "next/image";
import { Title } from "@/shared/components/";
import { AddToCartButton } from "@/shared/components/";
import { useBranches } from "../hooks";
import { Skeleton } from "./ui";
import { useSession } from "next-auth/react";
import { HiddenPhoto } from "@/shared/components/HiddenPhoto";
import { HiddenText } from "@/shared/components/HiddenText";

interface Props {
  product: Product;
  branchToProduct: BranchToProduct[];
}

export const ProductForm: React.FC<Props> = ({ product, branchToProduct }) => {
  const { branch, loading } = useBranches();
  const session = useSession();
  return (
    <div
      className={cn(
        "flex flex-1 flex-col justify-center items-center gap-5 md:items-start md:justify-normal md:flex-row mt-5",
        className,
      )}
    >
      {session.data?.user ? (
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-3xl object-cover sm:w-[500px] h-[500px] bg-white"
        />
      ) : (
        <HiddenPhoto className="sm:w-[500px] h-[500px]" />
      )}
      <div>
        <Title text={product.name} size="lg" className="font-bold mb-1" />
        {loading ? (
          <>
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-32 h-5 mt-5" />
          </>
        ) : (
          branchToProduct.map((item, index) => (
            <p
              key={item.branchId}
              className={cn(
                "before:inline-block before:rounded-full before:mr-[10px] before:bg-success before:w-[10px] before:h-[10px]",
                item.totalQuantity > 0
                  ? "before:bg-success"
                  : "before:bg-destructive",
              )}
            >
              Осталось {item.totalQuantity} шт. на&nbsp;
              {branch.find((b) => b.id === item.branchId)?.address}
            </p>
          ))
        )}

        <div className="flex items-center justify-between md:justify-normal gap-5 mt-5">
          <p className="text-3xl text-primary font-bold">
            {session.data?.user ? (
              `${product.price} ₽`
            ) : (
              <div className="flex items-center gap-2">
                <HiddenText /> ₽
              </div>
            )}
          </p>
          <AddToCartButton
            btps={branchToProduct}
            variant="white_accent"
            productId={product.id}
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

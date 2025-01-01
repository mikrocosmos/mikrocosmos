import React from "react";
import Image from "next/image";
import { cn } from "../lib/utils";
import Link from "next/link";
import { AddToCartButton } from "@/shared/components/AddToCartButton";
import { BranchToProduct } from "@prisma/client";

interface Props {
  id: number;
  btps: BranchToProduct[];
  name: string;
  imageUrl: string;
  price: number;
  className?: string;
}

export const ItemCard: React.FC<Props> = ({
  id,
  btps,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div
      title={name}
      className={cn(
        "w-full h-[450px] min-w-[250px] flex flex-col gap-5 items-center text-center relative bg-popover p-5 rounded-2xl shadow-xl cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <Link href={`/product/${id}`} className="flex-1">
        <div className="flex justify-center items-center relative h-[250px]">
          <Image
            src={imageUrl}
            className="rounded-2xl object-cover bg-white"
            alt={name}
            fill
          />
        </div>
        <p className="text-md font-medium h-12 mt-2 overflow-hidden text-ellipsis">
          {name}
        </p>
        <p className="text-primary text-2xl font-bold">{price} ₽</p>
      </Link>
      <AddToCartButton
        btps={btps}
        productId={id}
        variant="white_accent"
        className="w-5/6"
      />
    </div>
  );
};

import React from "react";
import Image from "next/image";
import { cn } from "../lib/utils";
import { Button } from "./ui";

interface Props {
  className?: string;
}

export const ItemCard: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-5 items-center text-center relative bg-popover p-5 rounded-2xl shadow-xl cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      <Image
        src="/assets/images/item.png"
        className="rounded-2xl"
        alt="item"
        width={200}
        height={200}
      />
      <p className="text-primary text-2xl font-bold">1 990 ₽</p>
      <p className="text-lg font-medium">Smoant Knight 40 Kit</p>
      <Button variant="outline_accent" className="w-5/6">
        В корзину
      </Button>
    </div>
  );
};

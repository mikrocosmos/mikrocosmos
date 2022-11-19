"use client";
import { CircleX, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Title } from "./Title";

export const CartItem = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-5 gap-5">
      <div className="relative flex-1 min-w-[200px] max-w-[200px] min-h-[200px]">
        <Image
          className="rounded-lg object-cover shadow-lg"
          src="/assets/images/item.png"
          alt=""
          fill
        />
      </div>
      <div className="flex-1 min-w-[300px]">
        <Title text="Smoant Knight 40 Kit" size="md" className="font-medium" />
        <div className="mt-3 text-lg flex items-center justify-between">
          <div className="flex items-center bg-white text-black p-2 gap-2 rounded-2xl shadow-lg">
            <button
              onClick={() => setQuantity((prev) => prev - 1)}
              className="w-5 h-5"
            >
              <Minus size={20} />
            </button>
            <input
              className="w-10 block text-center text-lg"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
            />
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-5 h-5"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="text-2xl text-primary font-medium">
            {1990 * quantity} ₽
          </div>
          <CircleX
            size={40}
            className="cursor-pointer text-destructive transition duration-300 hover:text-white"
          />
        </div>
        <div className="text-base mt-3">
          В наличии:
          <ul>
            <li className="mt-1 before:inline-block before:w-[10px] before:h-[10px] before:rounded-full before:bg-success before:mr-2">
              Подшибякина, 12
            </li>
            <li className="mt-1 before:inline-block before:w-[10px] before:h-[10px] before:rounded-full before:bg-destructive before:mr-2">
              Стройотрядовская, 6
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

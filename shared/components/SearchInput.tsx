"use client";
import { cn } from "@/shared/lib/utils";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import Link from "next/link";
import Image from "next/image";
import { Api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const ref = React.useRef<HTMLInputElement>(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products
          .search(searchQuery)
          .then((items) => {
            setProducts(items);
          });
      } catch (e) {
        console.error(e);
      }
    },
    250,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30 shadow-md",
          className,
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-black" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11 shadow text-popover"
          type="text"
          placeholder="Что ищете?"
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12",
            )}
          >
            {products.map((product) => (
              <Link
                onClick={onClickItem}
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center p-4 transition duration-300 hover:bg-secondary group hover:bg-opacity-10"
              >
                <Image
                  className="rounded-full"
                  src={product.imageUrl}
                  alt={product.name}
                  width={50}
                  height={50}
                />
                <div className="px-3 py-2 text-black group-hover:text-white transition duration-300">
                  {product.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { Container } from "./";
import { Category } from "@prisma/client";
import { useCategoryStore } from "@/shared/store";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  React.useEffect(() => {}, [categoryActiveId]);
  return (
    <div
      className={cn(
        "sticky top-0 shadow-lg shadow-black/5 z-10 scrollbar-none overflow-x-auto",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <div
          className={cn(
            "inline-flex rounded-3xl gap-1 bg-popover h-full",
            className
          )}
        >
          {categories.map(({ name, id }) => (
            <a
              href={`/#${name}`}
              key={id}
              className={cn(
                "flex items-center whitespace-nowrap font-medium h-11 rounded-3xl p-5 transition duration-300 hover:shadow-md shadow-gray-200",
                categoryActiveId === id && "bg-white text-primary"
              )}
            >
              <button>{name}</button>
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
};

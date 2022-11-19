"use client";
import Link from "next/link";
import React from "react";
import { useCategories } from "../hooks";
import { cn } from "../lib/utils";
import { AnimatedLink } from "./AnimatedLink";

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = ({ className }) => {
  const { categories } = useCategories();
  return (
    <ul className={cn("w-full lg:w-[250px]", className)}>
      {categories.map((category) => (
        <li className="text-lg mt-2" key={category.id}>
          <Link href={`/categories/${category.id}`}>
            <AnimatedLink text={category.name} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

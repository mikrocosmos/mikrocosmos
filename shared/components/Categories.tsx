"use client";
import Link from "next/link";
import React from "react";
import { useCategories } from "../hooks";
import { cn } from "../lib/utils";
import { AnimatedLink } from "./AnimatedLink";
import { Skeleton } from "@/shared/components/ui";

interface Props {
  className?: string;
}

export const Categories: React.FC<Props> = ({ className }) => {
  const { loading, categories } = useCategories();
  return (
    <ul
      className={cn(
        "w-[250px] h-full flex flex-col justify-between gap-4 py-5",
        className,
      )}
    >
      {loading
        ? Array(16)
            .fill(null)
            .map((_, index) => (
              <Skeleton className="rounded-2xl w-32 h-2" key={index} />
            ))
        : categories.map((category) => (
            <li className="text-lg" key={category.id}>
              <Link href={`/category/${category.id}`}>
                <AnimatedLink text={category.name} />
              </Link>
            </li>
          ))}
    </ul>
  );
};

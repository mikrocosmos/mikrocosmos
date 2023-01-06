"use client";
import React, { PropsWithChildren } from "react";
import { useIntersection } from "react-use";
import { ItemCard, Title } from "./";
import { useCategoryStore } from "@/shared/store/";
import { Product } from "@prisma/client";

interface Props {
  title: string;
  items: Product[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<PropsWithChildren<Props>> = ({
  title,
  items,
  className,
  categoryId,
  children,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold my-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center content-center lg:flex justify-between items-center gap-5">
        {items.map((product) => (
          <ItemCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.price}
            branchIds={product.branchIds}
          />
        ))}
        {children}
      </div>
    </div>
  );
};

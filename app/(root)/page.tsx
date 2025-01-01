import {
  Categories,
  Container,
  Hero,
  ProductsGroupList,
} from "@/shared/components/";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopBar } from "@/shared/components/TopBar";
import { fetchItems } from "@/shared/lib";
import React from "react";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await fetchItems();
  const btps = await prisma.branchToProduct.findMany();
  return (
    <>
      <Container className="py-5 w-full text-left">
        <div className="flex flex-col gap-5 lg:flex-row justify-between">
          <div className="bg-popover h-full py-5 px-7 text-base rounded-2xl hidden shadow lg:block lg:h-[500px]">
            <h2 className="text-xl font-medium">Категории</h2>
            <Categories />
          </div>
          <Hero />
        </div>
        <section className="mt-7">
          <TopBar
            categories={categories.filter(
              (category) => category.products.length > 0,
            )}
          />
          {categories.map((category) => (
            <ProductsGroupList
              key={category.id}
              title={category.name}
              btps={btps}
              items={category.products}
              categoryId={category.id}
            >
              <Link
                href={`/category/${category.id}`}
                className="w-full h-[450px] font-bold text-2xl flex justify-center items-center text-center bg-popover p-5 rounded-2xl shadow-xl cursor-pointer transition-all ease-in-out group hover:shadow-lg hover:bg-secondary origin-top-left"
              >
                Ещё
                <ArrowRight className="group-hover:translate-x-1 transition ease-in-out" />
              </Link>
            </ProductsGroupList>
          ))}
        </section>
      </Container>
    </>
  );
}

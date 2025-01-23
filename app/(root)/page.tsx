import {
  Categories,
  Container,
  Hero,
  ProductsGroupList,
} from "@/shared/components/";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopBar } from "@/shared/components/TopBar";
import React from "react";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      subCategories: {
        include: {
          products: {
            take: 3,
          },
        },
      },
    },
  });

  const btps = await prisma.branchToProduct.findMany();
  return (
    <Container className="py-5 w-full text-left">
      <div className="flex flex-col gap-5 lg:flex-row justify-between">
        <div className="bg-popover h-full py-5 px-7 text-base rounded-2xl hidden shadow lg:block lg:h-[600px]">
          <h2 className="text-xl font-medium">Категории</h2>
          <Categories />
        </div>
        <Hero />
      </div>
      <section className="mt-7">
        <TopBar
          categories={categories.filter(
            (category) => category.subCategories.length > 0,
          )}
        />
        {categories.map((category) => (
          <div key={category.id} id={category.name}>
            {category.subCategories.map((subcategory) => (
              <ProductsGroupList
                key={subcategory.id}
                title={subcategory.name}
                btps={btps}
                items={subcategory.products}
                categoryId={subcategory.categoryId}
              >
                <Link
                  href={`/category/${subcategory.categoryId}`}
                  className="w-full sm:h-[450px] font-bold text-2xl flex justify-center items-center text-center bg-popover p-5 rounded-2xl shadow-xl cursor-pointer transition-all ease-in-out group hover:shadow-lg hover:bg-secondary origin-top-left"
                >
                  Ещё
                  <ArrowRight className="group-hover:translate-x-1 transition ease-in-out" />
                </Link>
              </ProductsGroupList>
            ))}
          </div>
        ))}
      </section>
    </Container>
  );
}

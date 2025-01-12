import { notFound } from "next/navigation";
import { Container, ItemCard, Title, Filters } from "@/shared/components";
import { findItems } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/findItems";
import { prisma } from "@/prisma/prisma-client";
import Link from "next/link";
import Image from "next/image";
import { SubCategoryCard } from "@/shared/components/SubCategoryCard";

export default async function CategoryPage(props: {
  params: Promise<{ id: number }>;
  searchParams: Promise<GetSearchParams>;
}) {
  const btps = await prisma.branchToProduct.findMany();
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { id } = params;

  const category = await prisma.category.findFirst({
    where: { id: Number(id) },
    include: {
      subCategories: true,
    },
  });

  if (!category) return notFound();

  return (
    <Container className="page pb-5">
      <Title text={category.name} size="lg" className="font-bold my-5" />
      <div className="flex flex-wrap gap-5 justify-between">
        {category.subCategories.map((subCategory) => (
          <SubCategoryCard
            id={subCategory.id}
            name={subCategory.name}
            imageUrl={subCategory.imageUrl}
            key={subCategory.id}
          />
        ))}
      </div>
    </Container>
  );
}

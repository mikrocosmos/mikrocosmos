import { notFound } from "next/navigation";
import { Container, Title } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { SubCategoryCard } from "@/shared/components/SubCategoryCard";

export default async function SubCategoryPage(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;

  const { id } = params;

  const subCategory = await prisma.subCategory.findFirst({
    where: { id: Number(id) },
    include: {
      productVaries: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!subCategory) return notFound();

  return (
    <Container className="page pb-5">
      <Title text={subCategory.name} size="lg" className="font-bold my-5" />
      <div className="flex flex-wrap gap-5 justify-between">
        {subCategory.productVaries.map((vary) => (
          <SubCategoryCard
            id={vary.id}
            name={vary.name}
            imageUrl={vary.imageUrl}
            key={vary.id}
            inSubCategory
          />
        ))}
      </div>
    </Container>
  );
}

import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { Container, ItemCard, Title } from "@/shared/components";

export default async function CategoryPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const category = await prisma.category.findFirst({
    where: { id: Number(id) },
    include: {
      products: true,
    },
  });
  if (!category) return notFound();

  return (
    <Container>
      <Title text={category.name} size="lg" className="font-extrabold my-5" />
      <div className="grid grid-cols-4 justify-items-center content-center gap-5 mb-5">
        {category.products.map((product) => (
          <ItemCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </Container>
  );
}

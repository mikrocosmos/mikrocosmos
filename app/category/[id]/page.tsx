import { notFound } from "next/navigation";
import { Container, ItemCard, Title } from "@/shared/components";
import { Filters } from "../../../shared/components/Filters";
import { findItems } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/findItems";

export default async function CategoryPage({
  params: { id },
  searchParams,
}: {
  params: { id: number };
  searchParams: GetSearchParams;
}) {
  const category = await findItems(id, searchParams);
  if (!category) return notFound();

  return (
    <Container className="min-h-[82.7vh]">
      <Title text={category.name} size="lg" className="font-extrabold my-5" />
      <div className="flex gap-[80px]">
        <aside className="w-[350px] bg-popover p-5">
          <Filters />
        </aside>

        <div className="grid grid-cols-4 justify-items-center content-center gap-5 mb-5">
          {category.products.map((product) => (
            <ItemCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
              description={product.description}
              branchIds={product.branchIds}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

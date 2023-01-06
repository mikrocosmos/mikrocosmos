import { notFound } from "next/navigation";
import { Container, ItemCard, Title, Filters } from "@/shared/components";
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
  const categoryStatic = await findItems(id);
  if (!category) return notFound();
  const maxPrice = Math.max(
    ...categoryStatic!.products.map((product) => product.price)
  );
  const minPrice = Math.min(
    ...categoryStatic!.products.map((product) => product.price)
  );

  return (
    <Container className="min-h-[82.7vh]">
      <Title text={category.name} size="lg" className="font-extrabold my-5" />
      <div className="flex gap-[20px]">
        <aside className="min-w-[300px] bg-popover p-5 rounded-xl mb-5">
          <Filters minPrice={minPrice} maxPrice={maxPrice} />
        </aside>

        <div className="grid grid-cols-4 justify-items-center content-center gap-5 mb-5">
          {category.products.map((product) => (
            <ItemCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
              branchIds={product.branchIds}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

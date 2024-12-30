import { notFound } from "next/navigation";
import { Container, ItemCard, Title, Filters } from "@/shared/components";
import { findItems } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/findItems";

export default async function CategoryPage(
  props: {
    params: Promise<{ id: number }>;
    searchParams: Promise<GetSearchParams>;
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    id
  } = params;

  const category = await findItems(id, searchParams);
  const categoryStatic = await findItems(id);
  if (!category) return notFound();
  const maxPrice = Math.max(
    ...categoryStatic!.products.map((product) => product.price),
  );
  const minPrice = Math.min(
    ...categoryStatic!.products.map((product) => product.price),
  );

  return (
    <Container className="page">
      <Title text={category.name} size="lg" className="font-bold my-5" />
      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="min-w-[300px] bg-popover p-5 rounded-xl mb-5">
          <Filters minPrice={minPrice} maxPrice={maxPrice} />
        </aside>

        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center content-center gap-5 mb-5">
          {category.products.map((product) => (
            <ItemCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

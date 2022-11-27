import { Categories, Container, Hero, ItemCard } from "@/shared/components/";

export default function Home() {
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
          <h2 className="text-2xl font-bold">Новинки</h2>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:flex justify-between items-center gap-5">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </section>
      </Container>
    </>
  );
}

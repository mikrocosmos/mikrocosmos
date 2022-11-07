import { Container } from "@/shared/components/Container";

export default function Home() {
  return (
    <>
      <Container className="py-5 w-full text-left">
        <div className="flex justify-between">
          <div className="bg-popover h-full py-5 px-7 text-base rounded-2xl shadow lg:block">
            <h2 className="text-xl font-medium">Категории</h2>
            {/* Категории */}
          </div>
          {/*  Hero  */}
        </div>
        <section className="mt-7">
          <h2 className="text-2xl font-bold">Новинки</h2>
          <div className="mt-7 flex justify-between items-center gap-5">
            {/* NEW ITEMS */}
          </div>
        </section>
      </Container>
    </>
  );
}

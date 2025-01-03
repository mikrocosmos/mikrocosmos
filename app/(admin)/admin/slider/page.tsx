import { Categories, Container, Hero, Title } from "@/shared/components";
import { Button } from "@/shared/components/ui";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminSliderPage() {
  await checkAdmin();
  return (
    <Container className="admin-page">
      <div className="adaptive items-center text-center md:text-left md:items-start gap-2 justify-between">
        <div>
          <Title text="Слайдер" className="font-semibold" />
          <p>На главной странице он выглядит так:</p>
        </div>
        <div>
          <Button variant="white_accent">
            <Link className="flex items-center gap-2" href="/admin/slider/add">
              <CirclePlus strokeWidth={1.5} />
              Добавить слайд
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-5 lg:flex-row justify-between mt-4">
        <div className="bg-popover h-full py-5 px-7 text-base rounded-2xl hidden shadow lg:block lg:h-[500px]">
          <h2 className="text-xl font-medium">Категории</h2>
          <Categories />
        </div>
        <Hero inAdmin={true} />
      </div>
    </Container>
  );
}

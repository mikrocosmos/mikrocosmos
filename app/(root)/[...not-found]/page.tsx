import Link from "next/link";
import Image from "next/image";
import { Container, Title } from "@/shared/components";

export default function NotFound() {
  return (
    <Container className="page adaptive items-center justify-center">
      <div>
        <Title
          size="2xl"
          text="404"
          className="text-primary font-bold text-shadow"
        />
        <Title text="Ничего не найдено." size="xl" className="font-bold mt-2" />
        <p className="text-lg mt-2">
          Кажется, у нас нет такой страницы.{" "}
          <Link
            className="transition ease-linear text-primary hover:text-secondary"
            href="/"
          >
            Перейти на главную.
          </Link>
        </p>
      </div>
      <div className="w-full mt-5 md:w-1/4 md:h-1/3 flex items-center justify-center">
        <Image
          src="/assets/images/not-found.png"
          alt="Ничего не найдено"
          width={300}
          height={300}
        />
      </div>
    </Container>
  );
}

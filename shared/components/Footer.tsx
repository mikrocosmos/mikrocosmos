import React from "react";
import { Container } from "./Container";
import { cn } from "../lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn("bg-popover py-5", className)}>
      <Container>
        <div className="text-center lg:text-left opacity-50">
          Информация на данном сайте не является рекламой, предназначена для
          ограниченного круга лиц, а именно для совершеннолетних потребителей
          табачной продукции, для предоставления им достоверной информации об
          основных потребительских свойствах и качественных характеристик
          табачной продукции и аксессуарах для курения (ст.10 Закона «О защите
          прав Потребителя»). Лицам, не достигшим совершеннолетия, пользование
          Сайтом запрещено (ст. 20 ФЗ №15 «Об охране здоровья граждан»).
        </div>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row items-center justify-between text-base">
          <div className="opacity-50 transition hover:opacity-100">
            © {new Date().getFullYear()} Smoky Moon
          </div>
          <div className="opacity-50 transition hover:opacity-100">
            Все права защищены
          </div>
          <div className="opacity-50 transition hover:opacity-100 -link">
            <Link href="/privacy">Политика конфиденциальности</Link>
          </div>
          <div className="opacity-50 transition hover:opacity-100 -link">
            <Link href="/agreement">Пользовательское соглашение</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

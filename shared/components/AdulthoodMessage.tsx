"use client";
import React from "react";
import { Title } from "@/shared/components/Title";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui";
import { setCookie } from "@/app/actions";

interface Props {
  className?: string;
}

export const AdulthoodMessage: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "h-screen w-screen bg-popover z-[151] px-4 text-center fixed top-0 left-0 flex flex-col items-center justify-center",
        className,
      )}
    >
      <Title
        text="Вам действительно есть 18?"
        size="lg"
        className="font-bold"
      />
      <p>
        На данном сайте размещена продукция, которая согласно федеральному
        закону Российской Федерации от 23 февраля 2013 года №15-ФЗ ограничена к
        продаже лицам, не достигшим 18-летнего возраста, а так же к онлайн
        продаже. Продукция, размещенная на сайте, несёт ознакомительный
        характер. Приобрести товары можно только в наших магазинах. Для доступа
        к информации на сайте Вы должны подтвердить, что Вам есть 18 лет.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-2 justify-between mt-4">
        <Button
          onClick={() => setCookie("adult", "true")}
          variant="white_accent"
        >
          Да, есть
        </Button>
        <Button variant="outline_red">Нет, мне нет 18</Button>
      </div>
    </div>
  );
};

import React, { PropsWithChildren } from "react";
import { Popover } from "@/shared/components/ui";
import { PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export const YandexInfo: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <Popover>
      <PopoverTrigger className={className}>{children}</PopoverTrigger>
      <PopoverContent className="p-4">
        Нужна для отображения во время оформления заказа пользователем. Чтобы её
        сформировать, воспользуйтесь конструктором карт Яндекса:{" "}
        <a
          className="underline transition hover:text-primary"
          href="https://yandex.ru/map-constructor/"
          target="_blank"
        >
          https://yandex.ru/map-constructor
        </a>
        <p>На нём нужно сформировать карту, затем нажать на кнопку</p>
        <button
          onClick={() =>
            toast("ну, если её здесь нажать, ничего не произойдёт")
          }
          className="bg-[#ffd737] text-black text-center font-[Arial] py-1 px-3 cursor-pointer"
        >
          Получить код карты
        </button>
        <p>
          Далее надо выбрать <b>iframe</b>, скопировать, вставить в форму здесь.
          Если что, ссылка сама вырежется из iframe.
        </p>
      </PopoverContent>
    </Popover>
  );
};

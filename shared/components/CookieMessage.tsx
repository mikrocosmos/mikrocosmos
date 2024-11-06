"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui";
import { setCookie } from "@/app/actions";

interface Props {
  className?: string;
}

export const CookieMessage: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "fixed bottom-8 sm:right-8 bg-popover w-96 z-50 rounded-2xl p-5 shadow-xl",
        className,
      )}
    >
      <p>
        Сайт использует файлы cookies, чтобы сделать вашу работу с сайтом
        максимально удобной. Продолжая взаимодействие с сайтом, вы соглашаетесь
        с использованием файлов cookies.
      </p>
      <div className="flex items-center gap-2 justify-between mt-4">
        <Button
          onClick={() => setCookie("acceptedCookies", "true")}
          variant="white_accent"
        >
          Принять
        </Button>
        <Button variant="outline_red">Отклонить</Button>
      </div>
    </div>
  );
};

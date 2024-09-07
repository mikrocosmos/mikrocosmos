"use client";
import React from "react";
import { FormInput } from "@/shared/components/form";
import { CheckoutBlock } from "@/shared/components/checkout/CheckoutBlock";
import { Textarea } from "@/shared/components/ui";
import { RequiredSymbol } from "@/shared/components";

interface Props {
  className?: string;
}

export const CheckoutPersonal: React.FC<Props> = ({ className }) => {
  return (
    <CheckoutBlock className={className} title="Персональные данные">
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="text-lg">
          Имя
          <RequiredSymbol />
        </label>
        <FormInput
          name="firstName"
          placeholder="Введите ваше имя..."
          className="text-base mt-2"
        />
        <label htmlFor="phone" className="text-lg">
          Номер телефона
          <RequiredSymbol />
        </label>
        <FormInput
          name="phone"
          type="tel"
          placeholder="Введите номер телефона..."
          className="text-base mt-2"
        />
        <label htmlFor="email" className="text-lg">
          Электронная почта
          <RequiredSymbol />
        </label>
        <FormInput
          name="email"
          type="email"
          placeholder="Введите email..."
          className="text-base"
        />
        <label htmlFor="comment" className="text-lg">
          Комментарий
        </label>
        <Textarea
          name="comment"
          placeholder="Напишите комментарий к заказу..."
          className="text-base bg-white"
        />
      </div>
    </CheckoutBlock>
  );
};

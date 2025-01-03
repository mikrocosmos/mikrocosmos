"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions/actions";
import { formRegisterSchema, TFormRegisterValues } from "./schemas";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import { toastError, toastSuccess } from "@/shared/constants";
import { Title } from "../../Title";
import { Checkbox } from "@/shared/components/ui/checkbox";
import Link from "next/link";

interface Props {
  onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [accepted, setAccepted] = React.useState(false);

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        currentBranchId: 1,
      });

      toast("Регистрация прошла успешно!", toastSuccess);

      onClose?.();
    } catch (error) {
      return toast("Неверный E-Mail или пароль", toastError);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Регистрация" size="md" className="font-bold mt-2" />
          </div>
        </div>
        <FormInput name="email" label="E-Mail" placeholder="E-mail" required />
        <FormInput name="name" label="Имя" placeholder="Имя" required />
        <FormInput
          name="password"
          label="Пароль"
          placeholder="Пароль"
          type="password"
          required
        />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          placeholder="Подтвердите пароль"
          required
        />
        <div className="flex items-center text-base space-x-4 mt-2">
          <Checkbox id="terms" onCheckedChange={() => setAccepted(!accepted)} />
          <label htmlFor="terms" className="cursor-pointer">
            Регистрируясь на сайте, я подтверждаю, что мне больше 18 лет, даю
            согласие на&nbsp;
            <Link
              className="text-primary transition hover:text-secondary"
              href="/privacy"
            >
              обработку персональных данных
            </Link>
            &nbsp;и принимаю&nbsp;
            <Link
              className="text-primary transition hover:text-secondary"
              href="/agreement"
            >
              пользовательское соглашение
            </Link>
          </label>
        </div>
        <Button
          disabled={!accepted}
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};

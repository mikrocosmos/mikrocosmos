"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/shared/components/";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { toastError, toastSuccess } from "@/shared/constants";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast("Вы успешно вошли в аккаунт", toastSuccess);

      onClose?.();
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast("Не удалось войти в аккаунт", toastError);
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
            <Title text="Вход" size="md" className="font-bold mt-2" />
          </div>
        </div>

        <FormInput
          name="email"
          label="E-Mail"
          placeholder="Введите E-Mail..."
          required
        />
        <FormInput
          name="password"
          label="Пароль"
          type="password"
          placeholder="Введите пароль..."
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 mt-2 mx-5 text-base"
          type="submit"
          variant="outline_accent"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};

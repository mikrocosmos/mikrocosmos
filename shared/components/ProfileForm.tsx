"use client";
import { User } from "@prisma/client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formRegisterSchema,
  TFormRegisterValues,
} from "@/shared/components/modals/forms/schemas";
import { updateUserInfo } from "@/app/actions/actions";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/shared/constants";
import { signOut } from "next-auth/react";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";

interface Props {
  user: User;
  className?: string;
}

export const ProfileForm: React.FC<Props> = ({ className, user }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      toast("Данные обновлены", toastSuccess);
    } catch (error) {
      return toast("Неверный E-Mail или пароль", toastError);
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <FormProvider {...form}>
      <form
        className={cn("flex flex-col gap-4 w-96", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FormInput label="Имя" name="name" required />
        <FormInput label="E-Mail" name="email" required />
        <FormInput
          label="Сменить пароль"
          name="password"
          type="password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label="Повторите пароль"
          required
        />

        <Button
          variant="white_accent"
          disabled={form.formState.isSubmitting}
          className="text-base"
          type="submit"
        >
          Сохранить
        </Button>

        <Button
          onClick={onClickSignOut}
          variant="outline_red"
          disabled={form.formState.isSubmitting}
          className="text-base"
          type="button"
        >
          Выйти из аккаунта
        </Button>
      </form>
    </FormProvider>
  );
};

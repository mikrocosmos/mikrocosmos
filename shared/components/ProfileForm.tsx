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
      phone: user.phone || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        name: data.name,
        phone: data.phone,
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
        <FormInput label="Имя" name="name" required placeholder={user.name} />
        <FormInput
          label="E-Mail"
          name="email"
          required
          placeholder={user.email}
        />
        <FormInput
          label="Телефон"
          name="phone"
          placeholder={user.phone || "Телефон"}
        />
        <FormInput
          label="Сменить пароль"
          name="password"
          type="password"
          placeholder="Пароль"
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label="Повторите пароль"
          placeholder="Повторите пароль"
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

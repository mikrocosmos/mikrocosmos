"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { formAddUserSchema, TFormAddUserValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/app/actions/admin.users.actions";
import { UserRole } from "@prisma/client";
import { FormInput } from "@/shared/components/form/FormInput";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Form, FormField } from "../../ui/form";
import { Button, Label, RadioGroup } from "../../ui";
import { RadioGroupItem } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/shared/constants";

interface Props {
  className?: string;
}

export const AddUserForm: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const session = useSession().data;
  const [role, setRole] = React.useState<UserRole>("USER");
  const form = useForm<TFormAddUserValues>({
    resolver: zodResolver(formAddUserSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (data: TFormAddUserValues) => {
    try {
      await createUser({
        email: data.email,
        name: data.name,
        phone: data.phone,
        password: data.password,
        role,
        currentBranchId: session?.user.currentBranchId || 1,
      });
      router.push("/admin/users");
      toast("Пользователь добавлен", toastSuccess);
    } catch (error) {
      console.log(error);
      toast("Не удалось добавить пользователя", toastError);
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          "space-y-4 flex flex-col items-center sm:block md:w-full",
          className,
        )}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormInput {...field} name="name" label="Имя" placeholder="Имя" />
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              name="phone"
              label="Телефон"
              placeholder="Телефон"
            />
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              name="email"
              label="E-mail"
              placeholder="E-mail"
            />
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              name="password"
              type="password"
              label="Пароль"
              placeholder="Сменить пароль"
            />
          )}
        />
        <FormField
          name="passwordConfirm"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              name="passwordConfirm"
              type="password"
              label="Пароль"
              placeholder="Подтвердите пароль"
            />
          )}
        />
        <RadioGroup
          className="adaptive !md:flex-row gap-6"
          name="role"
          defaultValue="USER"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="USER" onClick={() => setRole("USER")} />
            <Label className="text-base" htmlFor="USER">
              Пользователь
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ADMIN" onClick={() => setRole("ADMIN")} />
            <Label className="text-base" htmlFor="ADMIN">
              Администратор
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="CASHIER"
              onClick={() => setRole("CASHIER")}
            />
            <Label className="text-base" htmlFor="CASHIER">
              Кассир
            </Label>
          </div>
        </RadioGroup>
        <div className="lg:flex items-center lg:space-x-4">
          <Button
            loading={form.formState.isSubmitting}
            variant="white_accent"
            type="submit"
          >
            Сохранить изменения
          </Button>
        </div>
      </form>
    </Form>
  );
};

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { formEditUserSchema, TFormEditUserValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteUser, updateUserInfo } from "@/app/actions/admin.users.actions";
import { User, UserRole } from "@prisma/client";
import { FormInput } from "@/shared/components/form/FormInput";
import { cn } from "@/shared/lib/utils";
import { FileX2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Form, FormField } from "../../ui/form";
import { Button, Label, RadioGroup } from "../../ui";
import { RadioGroupItem } from "@/shared/components/ui";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";

interface Props {
  user: User;
  className?: string;
}

export const EditUserForm: React.FC<Props> = ({ className, user }) => {
  const router = useRouter();
  const session = useSession().data;
  const [role, setRole] = React.useState<UserRole>(user.role);
  const form = useForm<TFormEditUserValues>({
    resolver: zodResolver(formEditUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      phone: user.phone || "",
      password: "",
      role: user.role,
    },
  });

  const onSubmit = async (data: TFormEditUserValues) => {
    try {
      await updateUserInfo(user.id, {
        email: data.email || user.email,
        name: data.name || user.name,
        phone: data.phone || user.phone,
        password: data.password || user.password,
        role,
      });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    await deleteUser(user.id);
    router.push("/admin/users");
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          "space-y-4 flex flex-col items-center w-screen sm:block md:w-full",
          className,
        )}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              name="name"
              label="Имя"
              placeholder={user.name}
            />
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
              placeholder={user.phone || "Телефон"}
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
              placeholder={user.email}
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
        <RadioGroup className="flex gap-6" name="role" defaultValue={user.role}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="USER" onClick={() => setRole("USER")} />
            <Label htmlFor="USER">Пользователь</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ADMIN" onClick={() => setRole("ADMIN")} />
            <Label htmlFor="ADMIN">Администратор</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="CASHIER"
              onClick={() => setRole("CASHIER")}
            />
            <Label htmlFor="CASHIER">Кассир</Label>
          </div>
        </RadioGroup>
        <div className="lg:flex items-center lg:space-x-4">
          <Button variant="white_accent" type="submit">
            Сохранить изменения
          </Button>
          <AreYouSureConfirm onConfirm={onDelete}>
            <Button type="button" variant="outline_red">
              Удалить пользователя
            </Button>
          </AreYouSureConfirm>
        </div>
      </form>
    </Form>
  );
};

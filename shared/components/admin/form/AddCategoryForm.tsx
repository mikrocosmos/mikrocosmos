"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/shared/components/ui/form";
import { Category } from "@prisma/client";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/app/actions/admin.category.actions";
import { useRouter } from "next/navigation";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";

interface Props {
  lastIndex: number;
  className?: string;
}

export const AddCategoryForm: React.FC<Props> = ({ className, lastIndex }) => {
  const router = useRouter();
  const formCategoryValues = z.object({
    name: z.string().min(1, "Название должно содержать не менее 1 символа"),
    order: z.coerce.number().optional(),
  });
  type TFormCategoryValues = z.infer<typeof formCategoryValues>;

  const form = useForm<TFormCategoryValues>({
    resolver: zodResolver(formCategoryValues),
    defaultValues: {
      name: "",
      order: lastIndex + 1,
    },
  });

  const onSubmit = async (data: TFormCategoryValues) => {
    try {
      await createCategory(data.name, data?.order);
      router.push("/admin/categories");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              label="Название"
              placeholder="Название"
              name="name"
            />
          )}
        />
        <FormField
          name="order"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              className="mt-4"
              label="Порядок"
              placeholder={String(lastIndex + 1) || "Порядок"}
            />
          )}
        />
        <div className="mt-4 flex items-center gap-5">
          <Button type="submit" variant="white_accent">
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  );
};

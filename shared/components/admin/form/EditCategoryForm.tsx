"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/shared/components/ui/form";
import { Category } from "@prisma/client";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import { updateCategory } from "@/app/actions/admin.category.actions";

interface Props {
  category: Category;
  className?: string;
}

export const EditCategoryForm: React.FC<Props> = ({ className, category }) => {
  const formCategoryValues = z.object({
    name: z.string().min(1, "Имя должно содержать не менее 1 символа"),
  });
  type TFormCategoryValues = z.infer<typeof formCategoryValues>;

  const form = useForm<TFormCategoryValues>({
    resolver: zodResolver(formCategoryValues),
    defaultValues: {
      name: category.name,
    },
  });

  const onSubmit = async (data: TFormCategoryValues) => {
    try {
      await updateCategory(category.id, data.name);
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
              placeholder={category?.name || "Название"}
              name="name"
            />
          )}
        />
        <div className="mt-4 flex items-center gap-5">
          <Button type="submit" variant="white_accent">
            Сохранить
          </Button>
          <Button variant="outline_red">Удалить</Button>
        </div>
      </form>
    </Form>
  );
};

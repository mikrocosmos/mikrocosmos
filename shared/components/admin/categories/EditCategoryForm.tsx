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
  deleteCategory,
  updateCategory,
} from "@/app/actions/admin.category.actions";
import { useRouter } from "next/navigation";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/shared/constants";

interface Props {
  category: Category;
  className?: string;
}

export const EditCategoryForm: React.FC<Props> = ({ className, category }) => {
  const router = useRouter();
  const formCategoryValues = z.object({
    name: z.string().min(1, "Название должно содержать не менее 1 символа"),
    order: z.coerce.number(),
  });
  type TFormCategoryValues = z.infer<typeof formCategoryValues>;

  const form = useForm<TFormCategoryValues>({
    resolver: zodResolver(formCategoryValues),
    defaultValues: {
      name: category.name,
      order: category.order,
    },
  });

  const onSubmit = async (data: TFormCategoryValues) => {
    try {
      await updateCategory(category.id, data.name);
      router.push("/admin/categories");
      toast("Категория обновлена", toastSuccess);
    } catch (error) {
      console.error(error);
      toast("Не удалось обновить категорию", toastError);
    }
  };

  const onDelete = async () => {
    await deleteCategory(category.id);
    router.push("/admin/categories");
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
        <FormField
          name="order"
          control={form.control}
          render={({ field }) => (
            <FormInput
              {...field}
              className="mt-4"
              label="Порядок"
              placeholder={String(category?.order) || "Порядок"}
            />
          )}
        />
        <div className="mt-4 flex items-center gap-5">
          <Button type="submit" variant="white_accent">
            Сохранить
          </Button>
          <AreYouSureConfirm
            text="Вы уверены, что хотите удалить категорию? Все товары, связанные с ней, будут удалены"
            onConfirm={onDelete}
          >
            <Button
              loading={form.formState.isSubmitting}
              type="button"
              variant="outline_red"
            >
              Удалить
            </Button>
          </AreYouSureConfirm>
        </div>
      </form>
    </Form>
  );
};

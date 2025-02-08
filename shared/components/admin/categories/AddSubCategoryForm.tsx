"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/shared/components/ui/form";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import { createSubCategory } from "@/app/actions/admin.subcategory.actions";
import { useRouter, useSearchParams } from "next/navigation";
import {
  formSubCategoryValues,
  TFormSubCategoryValues,
} from "@/shared/components/admin/categories/schema";
import { CategorySelect } from "@/shared/components/admin/categories/CategorySelect";
import { ImageInput } from "@/shared/components/admin/ImageInput";
import { cn } from "@/shared/lib/utils";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/shared/constants";
import { useCategories } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const AddSubCategoryForm: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("categoryId");

  const { categories } = useCategories();
  const categoryName = categories.find((c) => c.id === Number(category))?.name;
  const form = useForm<TFormSubCategoryValues>({
    resolver: zodResolver(formSubCategoryValues),
    defaultValues: {
      name: "",
      image: "",
      category: categoryName,
    },
  });

  const onSubmit = async (data: TFormSubCategoryValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("order", String(data.order));
      formData.append("category", data.category);
      formData.append("image", data.image);

      await createSubCategory(formData);
      router.push(`/admin/categories/${category}`);
      toast("Подкатегория добавлена", toastSuccess);
    } catch (error) {
      console.error(error);
      toast("Не удалось добавить подкатегорию", toastError);
    }
  };

  React.useEffect(() => {
    if (categoryName) {
      form.setValue("category", categoryName);
    }
  }, [categoryName, form]);

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-4", className)}
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
            <FormInput {...field} label="Порядок" placeholder="Порядок" />
          )}
        />
        <CategorySelect defaultCategory={categoryName} />
        <ImageInput />

        <div className="flex items-center gap-5">
          <Button
            loading={form.formState.isSubmitting}
            type="submit"
            variant="white_accent"
          >
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  );
};

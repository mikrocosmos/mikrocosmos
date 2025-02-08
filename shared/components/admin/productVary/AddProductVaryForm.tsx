"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/shared/components/ui/form";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import { createSubCategory } from "@/app/actions/admin.subcategory.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { CategorySelect } from "@/shared/components/admin/categories/CategorySelect";
import { ImageInput } from "@/shared/components/admin/ImageInput";
import { cn } from "@/shared/lib/utils";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/shared/constants";
import {
  formProductVaryValues,
  TFormProductVaryValues,
} from "@/shared/components/admin/productVary/schema";
import { SubCategorySelect } from "@/shared/components/admin/productVary/SubCategorySelect";
import { Category, SubCategory } from "@prisma/client";
import { useSubCategories } from "@/shared/hooks";
import { createProductVary } from "@/app/actions/admin.productvary.actions";

interface Props {
  categories: (Category & { subCategories: SubCategory[] })[];
  className?: string;
}

export const AddProductVaryForm: React.FC<Props> = ({
  className,
  categories,
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const subCategoryId = searchParams.get("subCategoryId");

  const category = categories.find((category) =>
    category.subCategories.some(
      (subCategory) => subCategory.id === Number(subCategoryId),
    ),
  );

  const subCategoryName = category?.subCategories.find(
    (subCategory) => subCategory.id === Number(subCategoryId),
  )?.name;

  const form = useForm<TFormProductVaryValues>({
    resolver: zodResolver(formProductVaryValues),
    defaultValues: {
      name: "",
      image: "",
      subCategory: subCategoryName,
      categoryId: category?.id,
    },
  });

  if (!category) {
    return null;
  }

  const onSubmit = async (data: TFormProductVaryValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("order", String(data.order));
      formData.append("subCategory", data.subCategory);
      formData.append("image", data.image);
      formData.append("categoryId", String(data.categoryId));

      await createProductVary(formData);
      toast("Подкатегория добавлена", toastSuccess);
      router.push(`/admin/subcategory/${subCategoryId}`);
    } catch (error) {
      console.error(error);
      toast("Не удалось добавить подкатегорию", toastError);
    }
  };

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
        <SubCategorySelect category={category} defaultValue={subCategoryName} />
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

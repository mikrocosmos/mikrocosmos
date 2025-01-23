"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/shared/components/ui/form";
import { Category, SubCategory } from "@prisma/client";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import {
  deleteSubCategory,
  updateSubCategory,
} from "@/app/actions/admin.subcategory.actions";
import { useRouter } from "next/navigation";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";
import {
  formSubCategoryValues,
  TFormSubCategoryValues,
} from "@/shared/components/admin/categories/schema";
import { CategorySelect } from "@/shared/components/admin/CategorySelect";
import { ImageInput } from "@/shared/components/admin/ImageInput";
import { cn } from "@/shared/lib/utils";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/shared/constants";

interface Props {
  subcategory: SubCategory & { category: Category };
  className?: string;
}

export const EditSubCategoryForm: React.FC<Props> = ({
  className,
  subcategory,
}) => {
  const router = useRouter();

  const form = useForm<TFormSubCategoryValues>({
    resolver: zodResolver(formSubCategoryValues),
    defaultValues: {
      name: subcategory.name,
      order: subcategory.order,
      image: subcategory.imageUrl,
      category: subcategory.category.name,
    },
  });

  const onSubmit = async (data: TFormSubCategoryValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("order", String(data.order));
      formData.append("category", data.category);
      formData.append("image", data.image || subcategory.imageUrl);

      await updateSubCategory(subcategory.id, formData);
      router.push("/admin/categories");
      toast("Подкатегория обновлена", toastSuccess);
    } catch (error) {
      console.error(error);
      toast("Не удалось обновить подкатегорию", toastError);
    }
  };

  const onDelete = async () => {
    await deleteSubCategory(subcategory.id);
    router.push("/admin/categories");
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
              placeholder={subcategory?.name || "Название"}
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
              label="Порядок"
              placeholder={String(subcategory?.order) || "Порядок"}
            />
          )}
        />
        <CategorySelect />
        <ImageInput />

        <div className="flex items-center gap-5">
          <Button type="submit" variant="white_accent">
            Сохранить
          </Button>
          <AreYouSureConfirm
            text="Вы уверены, что хотите удалить подкатегорию? Все товары, связанные с ней, будут удалены"
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

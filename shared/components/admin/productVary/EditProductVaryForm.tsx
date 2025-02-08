"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/shared/components/ui/form";
import { Category, ProductVary, SubCategory } from "@prisma/client";
import { FormInput } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";
import {
  deleteProductVary,
  updateProductVary,
} from "@/app/actions/admin.productvary.actions";
import { useRouter } from "next/navigation";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";
import {
  formProductVaryValues,
  TFormProductVaryValues,
} from "@/shared/components/admin/productVary/schema";
import { ImageInput } from "@/shared/components/admin/ImageInput";
import { cn } from "@/shared/lib/utils";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/shared/constants";
import { SubCategorySelect } from "@/shared/components/admin/productVary/SubCategorySelect";
import { subCategories } from "@/prisma/constants";

interface Props {
  vary: ProductVary & {
    subCategory: SubCategory & {
      category: Category & { subCategories: SubCategory[] };
    };
  };
  className?: string;
}

export const EditProductVaryForm: React.FC<Props> = ({ className, vary }) => {
  const router = useRouter();

  const form = useForm<TFormProductVaryValues>({
    resolver: zodResolver(formProductVaryValues),
    defaultValues: {
      name: vary.name,
      order: vary.order,
      image: vary.imageUrl,
      subCategory: vary.subCategory.name,
      categoryId: vary.subCategory.categoryId,
    },
  });

  const subCategoryId = vary.subCategoryId;

  const onSubmit = async (data: TFormProductVaryValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("order", String(data.order));
      formData.append("subCategory", data.subCategory);
      formData.append("image", data.image || vary.imageUrl);
      formData.append("categoryId", String(data.categoryId));

      await updateProductVary(vary.id, formData);
      router.push(`/admin/subcategory/${subCategoryId}`);
      toast("Вариация обновлена", toastSuccess);
    } catch (error) {
      console.error(error);
      toast("Не удалось обновить вариацию", toastError);
    }
  };

  const onDelete = async () => {
    await deleteProductVary(vary.id);
    router.push(`/admin/subcategory/${subCategoryId}`);
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
              placeholder={vary?.name || "Название"}
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
              placeholder={String(vary?.order) || "Порядок"}
            />
          )}
        />
        <SubCategorySelect category={vary.subCategory.category} />
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

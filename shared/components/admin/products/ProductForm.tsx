"use client";
import React from "react";
import { FormField } from "@/shared/components/ui/form";
import { FormInput, FormTextarea } from "@/shared/components/form";
import { Button, Skeleton } from "@/shared/components/ui";
import { BranchIdsFormField } from "@/shared/components/admin/products/BranchIdsFormField";
import { useFormContext } from "react-hook-form";
import { ProductWithSubCategoryAndBranch } from "@/@types/prisma";
import { TFormProductValues } from "@/shared/components/admin/products/schemas";
import { useBranches, useCategories } from "@/shared/hooks";
import { DeleteProductBtn } from "@/shared/components/admin/products/DeleteProductBtn";
import { CategorySelect } from "@/shared/components/admin/CategorySelect";
import { ImageInput } from "@/shared/components/admin/ImageInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { useSubCategories } from "@/shared/hooks/useSubCategories";

interface Props {
  onSubmit: (data: TFormProductValues) => void;
  product?: ProductWithSubCategoryAndBranch;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({
  onSubmit,
  product,
  className,
}) => {
  const { branch, loading } = useBranches();
  const form = useFormContext<TFormProductValues>();

  const { categories } = useCategories();
  const { subCategories: subCategoriesData } = useSubCategories();
  const [categoryName, setCategoryName] = React.useState(
    product?.subCategory.category.name || "",
  );

  const category = categories.find((item) => item.name === categoryName);

  const [subCategories, setSubCategories] = React.useState(
    subCategoriesData.filter((item) => item.categoryId === category?.id),
  );

  React.useEffect(() => {
    setSubCategories(
      subCategoriesData.filter((item) => item.categoryId === category?.id),
    );
  }, [category?.id, categoryName, subCategoriesData]);

  return (
    <form
      className={className}
      onSubmit={form.handleSubmit(onSubmit)}
      autoComplete="off"
      encType="multipart/form-data"
    >
      <div className="flex justify-center md:justify-start gap-10">
        <div className="mt-5 flex flex-col gap-5">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Название"
                placeholder={product?.name || "Название"}
                name="name"
              />
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormTextarea
                label="Описание"
                {...field}
                placeholder={product?.description || "Описание"}
              />
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Цена"
                placeholder={product?.price.toString() || "Цена"}
                name="price"
              />
            )}
          />
          <Select
            onValueChange={(e) => setCategoryName(e)}
            defaultValue={categoryName}
          >
            <SelectTrigger className={cn("w-full text-base", className)}>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                )),
              )}
            </SelectContent>
          </Select>
          {Array.isArray(subCategories) && !!subCategories.length && (
            <FormField
              name="subCategory"
              control={form.control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className={cn("w-full text-base", className)}>
                    <SelectValue placeholder="Выберите подкатегорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories?.map((subCategory) => (
                      <SelectItem key={subCategory.id} value={subCategory.name}>
                        {subCategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}

          {loading ? (
            <>
              <Skeleton className="w-[354px] h-12" />
              <Skeleton className="w-[354px] h-12" />
            </>
          ) : (
            <BranchIdsFormField
              branch={branch}
              branchToProducts={product?.branchIds}
            />
          )}
          <ImageInput />
        </div>
      </div>
      <Button className="mt-4" type="submit" variant="white_accent">
        Сохранить
      </Button>
      {product && <DeleteProductBtn className="ml-4" id={product.id} />}
    </form>
  );
};

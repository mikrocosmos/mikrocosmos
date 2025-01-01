import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { FormInput, FormTextarea } from "@/shared/components/form";
import { Button, Input, Skeleton, Textarea } from "@/shared/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { BranchIdsFormField } from "@/shared/components/admin/products/BranchIdsFormField";
import { useFormContext } from "react-hook-form";
import { ProductWithCategoryAndBranch } from "@/@types/prisma";
import { TFormProductValues } from "@/shared/components/admin/products/schemas";
import { useBranches, useCategories } from "@/shared/hooks";
import { DeleteProductBtn } from "@/shared/components/admin/products/DeleteProductBtn";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";
import { router } from "next/client";
import { deleteProduct } from "@/app/actions/admin.products.actions";

interface Props {
  onSubmit: (data: TFormProductValues) => void;
  product?: ProductWithCategoryAndBranch;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({
  onSubmit,
  product,
  className,
}) => {
  const { branch, loading } = useBranches();
  const { categories } = useCategories();
  const form = useFormContext<TFormProductValues>();

  return (
    <form
      className={className}
      onSubmit={form.handleSubmit(onSubmit)}
      autoComplete="off"
      encType="multipart/form-data"
    >
      <div className="flex gap-10">
        <div className="w-[700px] mt-5 flex flex-col gap-5">
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
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            )}
          />
          {loading ? (
            <Skeleton className="w-40 h-10" />
          ) : (
            <BranchIdsFormField
              branch={branch}
              branchToProducts={product?.branchIds}
            />
          )}
          <FormField
            name="image"
            control={form.control}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Изображение</FormLabel>
                <FormControl>
                  <Input
                    className="my-4 cursor-pointer"
                    {...fieldProps}
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
      <Button className="mt-4" type="submit" variant="white_accent">
        Сохранить
      </Button>
      {product && <DeleteProductBtn className="ml-4" id={product.id} />}
    </form>
  );
};

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { FormField } from "@/shared/components/ui/form";
import { useFormContext } from "react-hook-form";

import { Category, SubCategory } from "@prisma/client";

interface Props {
  className?: string;
  defaultValue?: string;
  category: Category & { subCategories: SubCategory[] };
}

export const SubCategorySelect: React.FC<Props> = ({
  className,
  category,
  defaultValue,
}) => {
  const form = useFormContext();
  const errorText = form.formState.errors.subCategory?.message as string;
  return (
    <>
      <FormField
        name="subCategory"
        control={form.control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className={cn("w-full text-base", className)}>
              <SelectValue
                placeholder={defaultValue || "Выберите подкатегорию"}
              />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                category.subCategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.name}>
                    {subCategory.name}
                  </SelectItem>
                )),
              )}
            </SelectContent>
          </Select>
        )}
      />
      {errorText && (
        <p className="text-red-500 text-sm mt-2">Выберите категорию</p>
      )}
    </>
  );
};

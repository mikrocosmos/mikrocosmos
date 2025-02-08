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
import { useCategories } from "@/shared/hooks";
import { Skeleton } from "../../ui";

interface Props {
  defaultCategory?: string;
  className?: string;
}

export const CategorySelect: React.FC<Props> = ({
  defaultCategory,
  className,
}) => {
  const form = useFormContext();
  const { categories, loading } = useCategories();

  if (loading) {
    return <Skeleton className="w-full h-10" />;
  }

  const errorText = form.formState.errors.category?.message as string;
  return (
    <div>
      <FormField
        name="category"
        control={form.control}
        render={({ field }) => (
          <Select
            name="category"
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger className={cn("w-full text-base", className)}>
              <SelectValue
                placeholder={defaultCategory || "Выберите категорию"}
              />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errorText && (
        <p className="text-red-500 text-sm mt-2">Выберите категорию</p>
      )}
    </div>
  );
};

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

interface Props {
  className?: string;
}

export const CategorySelect: React.FC<Props> = ({ className }) => {
  const form = useFormContext();
  const { categories } = useCategories();
  return (
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
  );
};

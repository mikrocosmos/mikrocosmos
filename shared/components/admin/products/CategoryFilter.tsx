import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { useCategories } from "@/shared/hooks";
import { Skeleton } from "../../ui";

interface Props {
  onChangeCategoryFilter: (value: string) => void;
  className?: string;
}

export const CategoryFilter: React.FC<Props> = ({
  className,
  onChangeCategoryFilter,
}) => {
  const { categories, loading } = useCategories();

  if (loading) {
    return <Skeleton className="w-[250px] h-10 my-4" />;
  }
  return (
    <Select
      onValueChange={(value) => {
        onChangeCategoryFilter(value);
      }}
    >
      <SelectTrigger className={cn("my-4 w-[250px]", className)}>
        <SelectValue placeholder="Фильтр по категории" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Все">Все</SelectItem>
        {Array.from(
          categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          )),
        )}
      </SelectContent>
    </Select>
  );
};

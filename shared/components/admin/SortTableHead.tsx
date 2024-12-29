import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Props {
  order: "asc" | "desc";
  sortBy: string;
  sortByValue: string;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  className?: string;
}

export const SortTableHead: React.FC<Props> = ({
  order,
  sortBy,
  sortByValue,
  setSortBy,
  setOrder,
  text,
  className,
}) => {
  return (
    <span
      className={cn(
        "flex items-center gap-2 transition hover:cursor-pointer hover:text-primary select-none whitespace-nowrap",
        className,
      )}
      onClick={() => {
        if (sortBy === sortByValue) {
          setOrder(order === "asc" ? "desc" : "asc");
        } else {
          setSortBy(sortByValue);
        }
      }}
    >
      {text}
      <ChevronDown
        size={18}
        className={
          order === "asc" && sortBy === sortByValue ? "rotate-180" : ""
        }
      />
    </span>
  );
};

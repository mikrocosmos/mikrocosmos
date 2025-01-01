import React from "react";
import { useAdminOrderSearchState } from "@/shared/store";
import { cn } from "@/shared/lib/utils";
import { Search } from "lucide-react";

interface Props {
  className?: string;
}

export const OrdersSearch: React.FC<Props> = ({ className }) => {
  const updateSearch = useAdminOrderSearchState((state) => state.updateSearch);
  return (
    <div
      className={cn(
        "flex items-center border p-2 rounded-2xl bg-white text-slate-400 transition focus-within:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        className,
      )}
    >
      <Search />
      <input
        onChange={(e) => updateSearch(e.target.value)}
        className="text-black pl-2 w-full h-full"
        type="text"
        placeholder="Поиск"
      />
    </div>
  );
};

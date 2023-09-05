import React from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  title?: string;
  value?: number;
  className?: string;
}

export const CheckoutTotalItem: React.FC<Props> = ({
  className,
  value,
  title,
}) => {
  return (
    <div className={cn(className, "flex my-4")}>
      <span className="flex flex-1 text-lg text-neutral-500">
        {title}
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>
      <span className="text-lg font-bold">{value} ₽</span>
    </div>
  );
};

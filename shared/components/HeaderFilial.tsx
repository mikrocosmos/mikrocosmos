import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { AnimatedLink } from "./AnimatedLink";

interface Props {
  className?: string;
}

export const HeaderFilial: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex items-center whitespace-nowrap cursor-pointer group",
        className
      )}
    >
      <ChevronDown
        size={20}
        className="group-hover:translate-y-0.5 transition duration-300"
      />
      <AnimatedLink
        text="Стройотрядовская, 12"
        className="ml-1 before:bottom-0"
      />
    </div>
  );
};

import React from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const HiddenText: React.FC<Props> = ({ className }) => {
  return <div className={cn("gradient-overlay w-20 h-6", className)}></div>;
};

import React from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  text: string;
  className?: string;
}

export const ErrorText: React.FC<Props> = ({ className, text }) => {
  return (
    <p className={cn("font-medium text-destructive text-sm", className)}>
      {text}
    </p>
  );
};

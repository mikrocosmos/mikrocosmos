import React, { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

interface Props {
  className?: string;
}

export const HeaderIcon: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "transition duration-200 flex justify-center items-center p-3 text-primary rounded-full hover:bg-white/20 hover:shadow cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
};

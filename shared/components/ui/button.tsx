import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "rounded-3xl py-3 px-12 transition-all duration-100 ease-linear hover:shadow-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-500",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-slate-200",
        outline:
          "outline outline-1 outline-white text-white bg-transparent hover:bg-white hover:text-black",
        outline_red:
          "outline outline-1 outline-white text-white bg-transparent hover:bg-destructive hover:outline-0",
        outline_accent:
          "outline outline-1 outline-white text-white bg-transparent hover:bg-secondary hover:outline-0",
        white_accent: "bg-white text-black hover:bg-secondary hover:text-white",
        white_red: "bg-white text-black hover:bg-destructive hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      asChild = false,
      children,
      disabled,
      loading,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {!loading ? children : <Loader2 className="w-5 h-5 animate-spin" />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

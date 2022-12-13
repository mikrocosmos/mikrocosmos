import { Minus, Plus } from "lucide-react";
import { CountButtonProps } from "./CountButton";
import { Button } from "./ui/button";
import { cn } from "@/shared/lib/utils";

interface IconButtonProps {
  size?: CountButtonProps["size"];
  disabled?: boolean;
  type?: "plus" | "minus";
  onClick?: () => void;
}

export const CountIconButton: React.FC<IconButtonProps> = ({
  size = "sm",
  disabled,
  type,
  onClick,
}) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={cn(
        "p-0 disabled:bg-white disabled:text-gray-800",
        size === "sm"
          ? "w-[30px] h-[30px] rounded-[15px]"
          : "w-[38px] h-[38px] rounded-md",
      )}
    >
      {type === "plus" ? (
        <Plus className={size === "sm" ? "h-4" : "h-5"} />
      ) : (
        <Minus className={size === "sm" ? "h-4" : "h-5"} />
      )}
    </Button>
  );
};

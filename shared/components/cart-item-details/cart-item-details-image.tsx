import { cn } from "@/shared/lib/utils";
import Image from "next/image";

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return (
    <Image
      width={80}
      height={80}
      className={cn("rounded", className)}
      src={src}
      alt="товар"
    />
  );
};

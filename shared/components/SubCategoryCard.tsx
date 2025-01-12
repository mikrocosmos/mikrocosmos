import React from "react";
import Image from "next/image";
import { Title } from "@/shared/components/Title";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

interface Props {
  id: number;
  name: string;
  imageUrl: string;
  inAdmin?: boolean;
  className?: string;
}

export const SubCategoryCard: React.FC<Props> = ({
  id,
  name,
  imageUrl,
  inAdmin,
  className,
}) => {
  return (
    <Link
      key={id}
      href={inAdmin ? `/admin/subcategory/${id}` : `/subcategory/${id}`}
      className={cn(
        "border-2 border-[#555] bg-popover rounded-xl shadow-md cursor-pointer transition duration-300 group hover:bg-secondary hover:border-primary flex flex-col items-center justify-center text-center p-20 gap-4",
        className,
      )}
    >
      <div className="flex items-center flex-col gap-5">
        <Image
          src={imageUrl}
          alt={name}
          width={250}
          height={250}
          className="group-hover:drop-shadow-2xl transition duration-300 bg-white rounded-xl"
        />
        <Title
          text={name}
          className="font-semibold transition duration-300 text-white"
        />
      </div>
    </Link>
  );
};

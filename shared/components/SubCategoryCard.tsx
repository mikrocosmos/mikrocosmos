import React from "react";
import Image from "next/image";
import { Title } from "@/shared/components/Title";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { getUserSession } from "@/shared/lib/getUserSession";
import { HiddenPhoto } from "@/shared/components/HiddenPhoto";

interface Props {
  id: number;
  name: string;
  imageUrl: string;
  categoryId?: number;
  subCategoryId?: number;
  inAdmin?: boolean;
  inSubCategory?: boolean;
  className?: string;
}

export const SubCategoryCard: React.FC<Props> = async ({
  id,
  name,
  imageUrl,
  inAdmin,
  inSubCategory,
  categoryId,
  subCategoryId,
  className,
}) => {
  const session = await getUserSession();
  const getLink = () => {
    switch (true) {
      case subCategoryId && inAdmin:
        return `/admin/vary/${id}?subCategoryId=${subCategoryId}`;
      case categoryId && inAdmin:
        return `/admin/subcategory/${id}?categoryId=${categoryId}`;
      case inAdmin && inSubCategory:
        return `/admin/vary/${id}`;
      case inAdmin:
        return `/admin/subcategory/${id}`;
      case !session:
        return `#`;
      case inSubCategory:
        return `/vary/${id}`;
      default:
        return `/subcategory/${id}`;
    }
  };
  return (
    <Link
      key={id}
      href={getLink()}
      className={cn(
        "border-2 border-[#555] bg-popover rounded-xl shadow-md cursor-pointer transition duration-300 group hover:bg-secondary hover:border-primary flex flex-col items-center justify-center text-center p-20 gap-4",
        className,
      )}
    >
      <div className="flex items-center flex-col gap-5">
        {session ? (
          <Image
            src={imageUrl}
            alt={name}
            width={250}
            height={250}
            className="group-hover:drop-shadow-2xl transition duration-300 bg-white rounded-xl"
          />
        ) : (
          <HiddenPhoto className="h-[250px] w-[250px]" />
        )}
        <Title
          text={name}
          className="font-semibold transition duration-300 text-white"
        />
      </div>
    </Link>
  );
};

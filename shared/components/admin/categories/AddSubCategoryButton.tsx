import React from "react";
import { Button } from "@/shared/components/ui";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  categoryId: string;
  className?: string;
}

export const AddSubCategoryButton: React.FC<Props> = ({
  className,
  categoryId,
}) => {
  return (
    <Link href={`/admin/subcategory/add?categoryId=${categoryId}`}>
      <Button variant="white_accent" className="flex items-center gap-2">
        <CirclePlus strokeWidth={1.5} />
        Добавить подкатегорию
      </Button>
    </Link>
  );
};

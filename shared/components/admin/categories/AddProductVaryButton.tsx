import React from "react";
import { Button } from "@/shared/components/ui";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

interface Props {
  subCategoryId?: string;
  className?: string;
}

export const AddProductVaryButton: React.FC<Props> = ({
  className,
  subCategoryId,
}) => {
  return (
    <Link href={`/admin/vary/add?subCategoryId=${subCategoryId}`}>
      <Button variant="white_accent" className="flex items-center gap-2">
        <CirclePlus strokeWidth={1.5} />
        Добавить вариацию
      </Button>
    </Link>
  );
};

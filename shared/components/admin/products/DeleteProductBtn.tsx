"use client";
import React from "react";
import { deleteProduct } from "@/app/actions/admin.actions";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui";

interface Props {
  id: number;
  className?: string;
}

export const DeleteProductBtn: React.FC<Props> = ({ className, id }) => {
  const router = useRouter();
  return (
    <Button
      variant="outline_red"
      onClick={() => {
        deleteProduct(id);
        router.back();
      }}
      className={className}
    >
      Удалить товар
    </Button>
  );
};

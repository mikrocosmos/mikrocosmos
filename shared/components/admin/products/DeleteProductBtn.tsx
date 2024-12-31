"use client";
import React from "react";
import { deleteProduct } from "@/app/actions/admin.products.actions";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui";
import { AreYouSureConfirm } from "@/shared/components/modals/AreYouSureConfirm";

interface Props {
  id: number;
  className?: string;
}

export const DeleteProductBtn: React.FC<Props> = ({ className, id }) => {
  const router = useRouter();
  const onConfirm = async () => {
    await deleteProduct(id);
    router.back();
  };
  return (
    <AreYouSureConfirm onConfirm={onConfirm}>
      <Button type="button" variant="outline_red" className={className}>
        Удалить товар
      </Button>
    </AreYouSureConfirm>
  );
};

"use client";
import React, { PropsWithChildren } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui";
import { Title } from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import { Api } from "@/shared/services/api-client";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  className?: string;
}

export const CancelOrderConfirm: React.FC<PropsWithChildren<Props>> = ({
  id,
  className,
  children,
}) => {
  const router = useRouter();
  const onCancelOrder = async () => {
    try {
      await Api.orders.changeStatus(id, "CANCELED");
      router.back();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Title text="Вы уверены, что хотите отменить заказ?" />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription
          className={cn(
            "text-white flex gap-5 items-center justify-center",
            className,
          )}
        >
          <DialogClose>
            <Button variant="white_accent">Вернуться</Button>
          </DialogClose>
          <Button onClick={() => onCancelOrder()} variant="outline_red">
            Отменить заказ
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

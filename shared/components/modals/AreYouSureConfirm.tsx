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

interface Props {
  onConfirm: () => Promise<void>;
  text?: string;
  className?: string;
}

export const AreYouSureConfirm: React.FC<PropsWithChildren<Props>> = ({
  text = "Это действие нельзя будет отменить",
  onConfirm,
  children,
  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Title text="Вы уверены?" size="md" />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="text-white text-base">{text}</p>
          <div className="mt-5 flex gap-5 items-center justify-center">
            <Button onClick={() => onConfirm()} variant="outline_red">
              Подтвердить
            </Button>
            <DialogClose>
              <Button variant="white_accent">Вернуться</Button>
            </DialogClose>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

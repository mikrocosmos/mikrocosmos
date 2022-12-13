import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui";
import { Phone } from "lucide-react";
import { HeaderIcon, Title } from "@/shared/components";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const ContactModal: React.FC<Props> = ({ className }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <HeaderIcon>
          <Phone size={30} />
        </HeaderIcon>
      </DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle className="text-3xl">Контакты</DialogTitle>
        </DialogHeader>
        <DialogDescription className={cn("text-white text-xl", className)}>
          <div>
            <p>Вы можете связаться с нами по этим номерам:</p>
            <p>
              <b>+7 (901) 029-20-20</b> (Стройотрядовская, 6)
            </p>
            <p>
              <b>+7 (830) 021-05-88</b>
              (Подшибякина,12)
            </p>
            <p>
              Наша почта: <b>example@mail.com</b>
            </p>
            <p>Наши адреса:</p>
            <p>
              <b>Стройотрядовская, 6</b>
            </p>
            <p>
              <b>Подшибякина, 12</b>
            </p>
            <p>
              <b>Ждём вас в нашем магазине!</b>
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

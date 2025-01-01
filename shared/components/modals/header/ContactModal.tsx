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
import { HeaderIcon } from "@/shared/components";
import { cn } from "@/shared/lib/utils";

interface Props {
  text?: string;
  className?: string;
}

export const ContactModal: React.FC<Props> = ({ className, text }) => {
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
          <article dangerouslySetInnerHTML={{ __html: text || "" }} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

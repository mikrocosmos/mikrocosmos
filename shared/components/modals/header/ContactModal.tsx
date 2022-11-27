import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/components/ui";
import { Phone } from "lucide-react";
import { HeaderIcon } from "@/shared/components";

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
        <p className="text-lg">+7 999 123 45 67</p>
        <p className="text-lg">+7 999 123 45 67</p>
      </DialogContent>
    </Dialog>
  );
};

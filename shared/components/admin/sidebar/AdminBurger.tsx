import React, { PropsWithChildren } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { X } from "lucide-react";
import { AdminSidebarContent, LogoutBtn } from "@/shared/components/admin";
import { HeaderFilial } from "@/shared/components";

export const AdminBurger: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full h-full flex flex-col gap-8 justify-between pb-0 border-0 bg-popover">
        <SheetHeader className="text-left flex-row justify-between items-center">
          <SheetTitle className="text-2xl font-bold">Меню</SheetTitle>
          <SheetClose>
            <X size={30} />
          </SheetClose>
        </SheetHeader>
        <HeaderFilial />
        <AdminSidebarContent />
        <SheetFooter className="my-5">
          <LogoutBtn />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

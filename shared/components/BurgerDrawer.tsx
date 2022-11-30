import React, { PropsWithChildren } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { X } from "lucide-react";
import { Categories, HeaderFilial, SearchInput } from "@/shared/components/";

export const BurgerDrawer: React.FC<PropsWithChildren> = ({ children }) => {
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
        <div>
          <SearchInput />
        </div>
        <div className="flex-1 text-xl">
          <p>Категории</p>
          <Categories className="pl-4" />
        </div>
        <SheetFooter>
          <HeaderFilial className="mb-8 text-xl" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

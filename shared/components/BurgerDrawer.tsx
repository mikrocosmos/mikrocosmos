"use client";
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
import {
  ChevronRight,
  CircleUserIcon,
  Phone,
  ShoppingCart,
  X,
} from "lucide-react";
import { SearchInput } from "./SearchInput";
import { cn } from "../lib/utils";
import Link from "next/link";
import { Categories } from "@/shared/components/Categories";

interface Props {}

export const BurgerDrawer: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
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
        <ul className="flex-1 text-xl">
          <li
            className="flex items-center cursor-pointer"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
          >
            Категории
            <ChevronRight
              className={cn(
                "ml-2 mt-1 transition",
                categoriesOpen && "rotate-90",
              )}
            />
          </li>

          {categoriesOpen && <Categories className="pl-4" />}

          <li className="text-xl mt-8">
            <Link href="/cart" className="flex items-center gap-3">
              <ShoppingCart className="text-primary" size={30} />
              Корзина
            </Link>
          </li>
          <li className="text-xl mt-8 flex items-center gap-3 cursor-pointer">
            <Phone className="text-primary" size={30} />
            Контакты
          </li>
          <li className="text-xl mt-8">
            <Link href="/auth" className="flex items-center gap-3">
              <CircleUserIcon className="text-primary" size={30} />
              Войти
            </Link>
          </li>
        </ul>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

import React from "react";
import { Container } from "@/shared/components/Container";
import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "@/shared/components/SearchInput";
import { HeaderFilial } from "./HeaderFilial";
import { cn } from "../lib/utils";
import { HeaderIcon } from "./HeaderIcon";
import { CircleUserRound, Menu, Phone, ShoppingCart } from "lucide-react";
import { BurgerDrawer } from "./BurgerDrawer";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("w-full h-24 bg-popover", className)}>
      <Container className="flex gap-5 justify-between items-center">
        <Link
          href="/"
          className="logo h-24 flex justify-center items-center text-primary"
        >
          <Image
            className=""
            src="/assets/images/logo.png"
            alt="Smoky Moon"
            width={60}
            height={60}
          />
          <h1 className="hidden lg:block">SMOKY MOON</h1>
        </Link>
        <SearchInput className="hidden lg:flex" />
        <HeaderFilial className="hidden lg:flex" />
        <div className="hidden lg:flex">
          <Link href="/cart">
            <HeaderIcon>
              <ShoppingCart size={30} />
            </HeaderIcon>
          </Link>
          <HeaderIcon>
            <Phone size={30} />
          </HeaderIcon>
          <HeaderIcon>
            <CircleUserRound size={30} />
          </HeaderIcon>
        </div>
        <BurgerDrawer>
          <HeaderIcon className="p-0 lg:hidden">
            <Menu size={50} />
          </HeaderIcon>
        </BurgerDrawer>
      </Container>
    </header>
  );
};

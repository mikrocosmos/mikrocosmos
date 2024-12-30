import React from "react";
import { Container } from "@/shared/components/Container";
import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "@/shared/components/SearchInput";
import { HeaderFilial } from "./HeaderFilial";
import { cn } from "../lib/utils";
import { HeaderIcon } from "./HeaderIcon";
import { Menu, ShoppingCart } from "lucide-react";
import { BurgerDrawer } from "./BurgerDrawer";
import { ContactModal } from "@/shared/components/modals/header";
import { CartDrawer } from "@/shared/components/CartDrawer";
import { ProfileButton } from "@/shared/components/ProfileButton";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("w-full h-24 bg-popover", className)}>
      <Container className="flex gap-5 justify-between items-center">
        <Link href="/" className="logo">
          <Image
            src="/assets/images/logo.png"
            alt="Smoky Moon"
            width={60}
            height={60}
          />
          <h1>SMOKY MOON</h1>
        </Link>
        <SearchInput className="hidden lg:flex" />
        <HeaderFilial className="hidden lg:flex" />
        <div className="flex items-center">
          <CartDrawer>
            <HeaderIcon>
              <ShoppingCart size={30} />
            </HeaderIcon>
          </CartDrawer>
          <ContactModal />
          <ProfileButton />
          <BurgerDrawer>
            <HeaderIcon className="p-3 pr-0 lg:hidden">
              <Menu size={40} />
            </HeaderIcon>
          </BurgerDrawer>
        </div>
      </Container>
    </header>
  );
};

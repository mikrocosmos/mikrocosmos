import React from "react";
import { cn } from "@/shared/lib/utils";
import { HeaderFilial } from "@/shared/components";
import { getUserSession } from "@/shared/lib/getUserSession";
import { Separator } from "@/shared/components/ui";
import { LogoutBtn } from "@/shared/components/admin/header/LogoutBtn";
import Link from "next/link";
import { AdminBurger } from "@/shared/components/admin";
import { Menu } from "lucide-react";

interface Props {
  className?: string;
}

export const AdminHeader: React.FC<Props> = async ({ className }) => {
  const session = await getUserSession();
  return (
    <header
      className={cn(
        "w-full fixed h-[70px] bg-popover px-5 flex items-center justify-between z-50",
        className,
      )}
    >
      <div className="flex">
        <Link
          href="/admin"
          className="text-lg font-medium transition hover:text-primary"
        >
          Smoky Moon | Admin
        </Link>
        <HeaderFilial className="ml-5 hidden sm:!flex" />
      </div>
      <div className="items-center hidden sm:!flex">
        <div className="text-lg">{session?.name}</div>
        <Separator
          orientation="vertical"
          className="mx-4 w-px h-6 bg-neutral-200"
        />
        <LogoutBtn />
      </div>
      <div className="block sm:hidden">
        <AdminBurger>
          <Menu size={40} />
        </AdminBurger>
      </div>
    </header>
  );
};

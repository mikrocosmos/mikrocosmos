import React from "react";
import { AdminSidebarItem } from "@/shared/components/admin";
import Link from "next/link";
import {
  ArrowLeft,
  Box,
  ChartBarStacked,
  RectangleEllipsis,
  Rows4,
  Store,
  Users,
} from "lucide-react";
import { sidebarItems } from "@/shared/constants";
import { getUserSession } from "@/shared/lib/getUserSession";

interface Props {
  className?: string;
}

export const AdminSidebarContent: React.FC<Props> = async ({ className }) => {
  const session = await getUserSession();
  return (
    <>
      <ul className="flex h-full flex-1 flex-col gap-5">
        {sidebarItems(session?.role).map((item) => (
          <AdminSidebarItem
            key={item.name}
            name={item.name}
            link={item.link}
            icon={item.icon}
          />
        ))}
      </ul>
      <Link
        className="flex gap-3 items-center text-lg transition hover:text-[#C7ACFF]"
        href="/"
      >
        <ArrowLeft />В магазин
      </Link>
    </>
  );
};

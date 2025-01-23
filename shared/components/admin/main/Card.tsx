import React from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

interface Props {
  name: string;
  link: string;
  icon: React.ReactNode;
  className?: string;
}

export const Card: React.FC<Props> = ({ className, name, link, icon }) => {
  return (
    <Link
      href={`/admin/${link}`}
      className={cn(
        "w-[180px] h-[150px] bg-[#696969] border-2 border-gray-200 rounded-2xl transition hover:border-primary hover:bg-primary hover:shadow-lg flex flex-col justify-between items-center py-5 gap-2 admin-card",
        className,
      )}
    >
      {icon}
      <span className="text-xl">{name}</span>
    </Link>
  );
};

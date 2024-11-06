import React from "react";
import Link from "next/link";

interface Props {
  name: string;
  link: string;
  icon: React.ReactNode;
}

export const AdminSidebarItem: React.FC<Props> = ({ name, link, icon }) => {
  return (
    <li>
      <Link
        href={`/admin/${link}`}
        className="flex gap-3 items-center text-lg transition hover:text-[#C7ACFF]"
      >
        {icon} {name}
      </Link>
    </li>
  );
};

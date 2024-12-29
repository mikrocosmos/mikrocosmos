import React from "react";
import { AdminSidebarContent } from "@/shared/components/admin";

interface Props {
  className?: string;
}

export const AdminSidebar: React.FC<Props> = ({ className }) => {
  return (
    <aside className="bg-[#696969] fixed top-[70px] left-0 bottom-0 w-56 p-5 pb-14 hidden sm:block">
      <AdminSidebarContent />
    </aside>
  );
};

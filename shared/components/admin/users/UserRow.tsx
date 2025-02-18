import React from "react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import { ArrowDownRight } from "lucide-react";

interface Props {
  id: number;
  role: string;
  name: string;
  phone: string;
  email: string;
  className?: string;
}

export const UserRow: React.FC<Props> = async ({
  className,
  id,
  role,
  phone,
  name,
  email,
}) => {
  const roleMap = new Map([
    ["ADMIN", "Администратор"],
    ["USER", "Пользователь"],
    ["CASHIER", "Кассир"],
  ]);
  return (
    <TableRow className={cn("mt-2 max-w-[380px]", className)}>
      <TableCell>{id}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{roleMap.get(role)}</TableCell>
      <TableCell>
        <Link
          href={`/admin/users/${id}`}
          className="hover:underline text-right flex items-center gap-1"
        >
          Подробнее
          <ArrowDownRight size={20} strokeWidth={1.5} />
        </Link>
      </TableCell>
    </TableRow>
  );
};

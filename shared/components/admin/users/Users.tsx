import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { User } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { UserRow } from "@/shared/components/admin/users/UserRow";

interface Props {
  users: User[];
  className?: string;
}

export const Users: React.FC<Props> = ({ users, className }) => {
  return (
    <Table className={cn("w-full", className)}>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white">ID</TableHead>
          <TableHead className="text-white">Телефон</TableHead>
          <TableHead className="text-white">Email</TableHead>
          <TableHead className="text-white">Имя</TableHead>
          <TableHead className="text-white">Роль</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            id={user.id}
            name={user.name}
            phone={user.phone ? user.phone : ""}
            email={user.email}
            role={user.role}
          />
        ))}
      </TableBody>
    </Table>
  );
};

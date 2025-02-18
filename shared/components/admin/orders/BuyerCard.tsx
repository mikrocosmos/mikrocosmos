import React from "react";
import Link from "next/link";

interface Props {
  id: number;
  name: string;
  phone?: string | null;
  email: string;
}

export const BuyerCard: React.FC<Props> = ({ id, name, phone, email }) => {
  return (
    <Link
      href={`/admin/users/${id}`}
      className="mt-2 flex flex-col gap-1 border-2 rounded-2xl p-4 shadow-lg transition hover:bg-primary hover:border-primary"
    >
      <p className="text-lg">
        Имя: <b>{name}</b>
      </p>
      {phone && (
        <p className="text-lg">
          Телефон: <b>{phone}</b>
        </p>
      )}
      <p className="text-lg">
        Email: <b>{email}</b>
      </p>
    </Link>
  );
};

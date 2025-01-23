"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutBtn: React.FC = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-lg flex items-center gap-1 transition duration-300 hover:text-primary"
    >
      Выйти <LogOut size={20} />
    </button>
  );
};

import React from "react";
import { cn } from "@/shared/lib/utils";
import { AuthModal } from "@/shared/components/modals/header";

interface Props {
  className?: string;
}

export const HiddenPhoto: React.FC<Props> = ({ className }) => {
  return (
    <AuthModal>
      <div
        className={cn(
          "gradient-overlay rounded-2xl flex items-center justify-center p-5",
          className,
        )}
      >
        <p>Войдите в аккаунт, чтобы увидеть фото</p>
      </div>
    </AuthModal>
  );
};

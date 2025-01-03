"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/shared/components/ui";
import { CircleUserRound } from "lucide-react";
import { HeaderIcon } from "@/shared/components/HeaderIcon";
import Link from "next/link";
import { AuthModal } from "@/shared/components/modals/header";

interface Props {
  onClickLogin?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ onClickLogin, className }) => {
  const [loading, setLoading] = React.useState(true);
  const { data: session } = useSession();

  React.useEffect(() => {
    if (session === null || session) {
      setLoading(false);
    }
  }, [session]);
  return (
    <div className={className}>
      {!session ? (
        <Button
          className="bg-transparent p-0 hover:bg-transparent"
          loading={loading}
          onClick={onClickLogin}
        >
          <AuthModal>
            <HeaderIcon>
              <CircleUserRound size={30} />
            </HeaderIcon>
          </AuthModal>
        </Button>
      ) : (
        <Link href="/profile">
          <HeaderIcon>
            <CircleUserRound size={30} />
          </HeaderIcon>
        </Link>
      )}
    </div>
  );
};

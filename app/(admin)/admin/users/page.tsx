import { Container, Title } from "@/shared/components";
import { checkAdmin } from "@/shared/lib/checkAdmin";
import { prisma } from "@/prisma/prisma-client";
import { Users } from "@/shared/components/admin/users/Users";
import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { UserPlus2 } from "lucide-react";

export default async function AdminUsersPage() {
  await checkAdmin(true);
  const users = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return (
    <Container className="admin-page max-w-[100vw]">
      <div className="adaptive gap-4 md:gap-0 items-center justify-between w-full">
        <Title text="Пользователи" className="font-semibold" />
        <Link href="/admin/users/add">
          <Button variant="white_accent" className="flex items-center gap-2">
            <UserPlus2 strokeWidth={1.5} />
            Добавить пользователя
          </Button>
        </Link>
      </div>
      <Users className="mt-4" users={users} />
    </Container>
  );
}

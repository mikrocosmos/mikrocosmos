import { Container, Title } from "@/shared/components";
import { checkAdmin } from "@/shared/lib/checkAdmin";
import { EditUserForm } from "@/shared/components/admin/users/EditUserForm";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";

export default async function AdminUserPage({
  params,
}: {
  params: { id: string };
}) {
  await checkAdmin();
  const user = await prisma.user.findFirst({
    where: {
      id: Number(params.id),
    },
  });

  if (!user) {
    return redirect("/404");
  }
  return (
    <Container className="admin-page">
      <Title text={user.name} className="font-semibold" />
      <EditUserForm user={user} />
    </Container>
  );
}

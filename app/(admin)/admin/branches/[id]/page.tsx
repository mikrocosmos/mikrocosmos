import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { Container, Title } from "@/shared/components";

import { EditBranchForm } from "@/shared/components/admin/branches/EditBranchForm";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminBranchPage(props: {
  params: Promise<{ id: string }>;
}) {
  await checkAdmin();
  const params = await props.params;

  const { id } = params;

  const branch = await prisma.branch.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!branch) {
    return redirect("/404");
  }

  return (
    <Container className="admin-page">
      <Title text="Редактировать филиал" className="font-semibold" />
      <EditBranchForm branch={branch} className="mt-4 w-[80vw]" />
    </Container>
  );
}

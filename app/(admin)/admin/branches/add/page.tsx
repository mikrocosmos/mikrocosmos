import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { Container, Title } from "@/shared/components";
import { checkAdmin } from "@/shared/lib/checkAdmin";
import { EditBranchForm } from "@/shared/components/admin/branches/EditBranchForm";
import { AddBranchForm } from "@/shared/components/admin/branches/AddBranchForm";

export default async function AdminAddBranchPage() {
  await checkAdmin();

  return (
    <Container className="admin-page">
      <Title text="Редактировать категорию" className="font-semibold" />
      <AddBranchForm className="mt-4 w-[80vw]" />
    </Container>
  );
}

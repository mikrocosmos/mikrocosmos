import { Container, Title } from "@/shared/components";
import { AddBranchForm } from "@/shared/components/admin/branches/AddBranchForm";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminAddBranchPage() {
  await checkAdmin();
  return (
    <Container className="admin-page">
      <Title text="Редактировать категорию" className="font-semibold" />
      <AddBranchForm className="mt-4 w-[80vw]" />
    </Container>
  );
}

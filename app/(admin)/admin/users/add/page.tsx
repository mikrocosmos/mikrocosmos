import { Container, Title } from "@/shared/components";
import { AddUserForm } from "@/shared/components/admin/users/AddUserForm";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminUsersAddPage() {
  await checkAdmin();
  return (
    <Container className="admin-page">
      <Title text="Добавить пользователя" className="font-semibold" />
      <AddUserForm />
    </Container>
  );
}

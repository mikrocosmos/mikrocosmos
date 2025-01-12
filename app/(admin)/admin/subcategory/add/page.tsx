import { AddSubCategoryForm } from "@/shared/components/admin/categories/AddSubCategoryForm";
import { Container, Title } from "@/shared/components";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminSubCategoryAddPage() {
  await checkAdmin();
  return (
    <Container className="admin-page">
      <Title text="Добавить подкатегорию" className="font-semibold" />
      <AddSubCategoryForm />
    </Container>
  );
}

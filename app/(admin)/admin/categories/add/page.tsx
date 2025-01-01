import { Container, Title } from "@/shared/components";
import { getCategoryLastIndex } from "@/shared/lib/getCategoryLastIndex";
import { AddCategoryForm } from "@/shared/components/admin/categories/AddCategoryForm";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminCategoryAddPage() {
  await checkAdmin();

  const lastIndex = await getCategoryLastIndex();

  return (
    <Container className="admin-page">
      <Title text="Добавить категорию" className="font-semibold" />
      <AddCategoryForm lastIndex={lastIndex} />
    </Container>
  );
}

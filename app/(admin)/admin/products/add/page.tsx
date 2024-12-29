import { AddProductForm } from "@/shared/components/admin/form/AddProductForm";
import { Container, Title } from "@/shared/components";

export default async function AdminProductsAddPage() {
  return (
    <Container className="admin-page">
      <Title text="Добавить товар" className="font-semibold mt-2" />
      <AddProductForm />
    </Container>
  );
}

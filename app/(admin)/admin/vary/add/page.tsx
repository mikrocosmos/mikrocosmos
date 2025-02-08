import { Container, Title } from "@/shared/components";
import { checkAdmin } from "@/shared/lib/checkAdmin";
import { AddProductVaryForm } from "@/shared/components/admin/productVary/AddProductVaryForm";
import { prisma } from "@/prisma/prisma-client";

export default async function AdminVaryAddPage() {
  await checkAdmin();
  const categories = await prisma.category.findMany({
    include: {
      subCategories: true,
    },
  });

  return (
    <Container className="admin-page">
      <Title text="Добавить вариацию" className="font-semibold" />
      <AddProductVaryForm categories={categories} />
    </Container>
  );
}

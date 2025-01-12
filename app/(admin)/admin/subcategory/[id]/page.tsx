import { Container, Title } from "@/shared/components";

import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { EditSubCategoryForm } from "@/shared/components/admin/categories/EditSubCategoryForm";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminSubcategoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  await checkAdmin();
  const params = await props.params;

  const { id } = params;

  const subcategory = await prisma.subCategory.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      category: true,
    },
  });

  if (!subcategory) {
    return redirect("/404");
  }

  return (
    <Container className="admin-page">
      <Title text="Редактировать подкатегорию" className="font-semibold" />
      <EditSubCategoryForm subcategory={subcategory} className="mt-4" />
    </Container>
  );
}

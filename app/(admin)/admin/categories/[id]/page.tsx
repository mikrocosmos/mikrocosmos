import { EditCategoryForm } from "@/shared/components/admin/categories/EditCategoryForm";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { getUserSession } from "@/shared/lib/getUserSession";
import { Container, Title } from "@/shared/components";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminCategoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  await checkAdmin();
  const params = await props.params;

  const { id } = params;

  const category = await prisma.category.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!category) {
    return redirect("/404");
  }

  return (
    <Container className="admin-page">
      <Title text="Редактировать категорию" className="font-semibold" />
      <EditCategoryForm category={category} className="mt-4" />
    </Container>
  );
}

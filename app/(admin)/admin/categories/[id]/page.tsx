import { EditCategoryForm } from "@/shared/components/admin/form/EditCategoryForm";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { getUserSession } from "@/shared/lib/getUserSession";
import { Container, Title } from "@/shared/components";

export default async function AdminCategoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const session = await getUserSession();

  if (!session || session?.role !== ("ADMIN" || "CASHIER")) {
    return redirect("/404");
  }
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

import { redirect } from "next/navigation";
import { getUserSession } from "@/shared/lib/getUserSession";
import { Container, Title } from "@/shared/components";
import { getCategoryLastIndex } from "@/shared/lib/getCategoryLastIndex";
import { AddCategoryForm } from "@/shared/components/admin/form/AddCategoryForm";

export default async function AdminCategoryAddPage() {
  const session = await getUserSession();

  if (!session || session?.role !== ("ADMIN" || "CASHIER")) {
    return redirect("/404");
  }

  const lastIndex = await getCategoryLastIndex();

  return (
    <Container className="admin-page">
      <Title text="Добавить категорию" className="font-semibold" />
      <AddCategoryForm lastIndex={lastIndex} />
    </Container>
  );
}

import { AddProductForm } from "@/shared/components/admin/form/AddProductForm";
import { Container, Title } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function AdminProductsAddPage() {
  const session = await getUserSession();

  if (!session || session?.role !== ("ADMIN" || "CASHIER")) {
    return redirect("/404");
  }
  const branches = await prisma.branch.findMany();
  return (
    <Container className="admin-page">
      <Title text="Добавить товар" className="font-semibold mt-2" />
      <AddProductForm branch={branches} />
    </Container>
  );
}

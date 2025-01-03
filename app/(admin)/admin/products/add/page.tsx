import { AddProductForm } from "@/shared/components/admin/products/AddProductForm";
import { Container, Title } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminProductsAddPage() {
  await checkAdmin();
  const branches = await prisma.branch.findMany();
  return (
    <Container className="admin-page w-full">
      <Title
        text="Добавить товар"
        className="font-semibold mt-2 text-center md:text-left"
      />
      <AddProductForm branch={branches} />
    </Container>
  );
}

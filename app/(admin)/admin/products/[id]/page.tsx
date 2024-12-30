import { Container, Title } from "@/shared/components";
import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";
import { EditProductForm } from "@/shared/components/admin/form/EditProductForm";
import { prisma } from "@/prisma/prisma-client";
import { deleteProduct } from "@/app/actions/admin.products.actions";
import { DeleteProductBtn } from "@/shared/components/admin/products/DeleteProductBtn";

export default async function AdminProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const session = await getUserSession();

  if (!session || session?.role !== ("ADMIN" || "CASHIER")) {
    return redirect("/404");
  }

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      category: true,
      branchIds: {
        include: {
          branch: true,
        },
      },
    },
  });

  if (!product) return redirect("/404");

  return (
    <Container className="admin-page">
      <Title text={product.name} className="font-semibold" />

      <EditProductForm product={product} />
    </Container>
  );
}

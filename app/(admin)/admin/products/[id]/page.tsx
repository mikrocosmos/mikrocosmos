import { Container, Title } from "@/shared/components";
import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";
import { EditProductForm } from "@/shared/components/admin/products/EditProductForm";
import { prisma } from "@/prisma/prisma-client";
import { deleteProduct } from "@/app/actions/admin.products.actions";
import { DeleteProductBtn } from "@/shared/components/admin/products/DeleteProductBtn";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  await checkAdmin();

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
      <Title
        text={product.name}
        className="font-semibold text-center md:text-left"
      />

      <EditProductForm product={product} />
    </Container>
  );
}

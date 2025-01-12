import { Container } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { ProductForm } from "@/shared/components/";

export default async function ProductPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });

  const branchToProduct = await prisma.branchToProduct.findMany({
    where: {
      productId: Number(id),
    },
  });

  if (!product) return redirect("/404");

  return (
    <Container className="page">
      <div className="flex flex-1">
        <ProductForm branchToProduct={branchToProduct} product={product} />
      </div>
    </Container>
  );
}

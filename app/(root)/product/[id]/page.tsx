import { Container } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { ProductForm } from "@/shared/components/";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });

  if (!product) return redirect("/404");

  return (
    <Container className="page">
      <div className="flex flex-1">
        <ProductForm product={product} />
      </div>
    </Container>
  );
}

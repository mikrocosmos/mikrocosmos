import { Container, Title } from "@/shared/components";

import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { checkAdmin } from "@/shared/lib/checkAdmin";
import { EditProductVaryForm } from "@/shared/components/admin/productVary/EditProductVaryForm";
import React from "react";

export default async function AdminVaryEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  await checkAdmin();
  const params = await props.params;

  const { id } = params;

  const vary = await prisma.productVary.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      subCategory: {
        include: {
          category: {
            include: {
              subCategories: true,
            },
          },
        },
      },
      products: true,
    },
  });
  if (!vary) {
    return redirect("/404");
  }
  return (
    <Container className="admin-page">
      <Title text="Редактировать вариацию" className="font-semibold" />
      <EditProductVaryForm vary={vary} className="my-4" />
    </Container>
  );
}

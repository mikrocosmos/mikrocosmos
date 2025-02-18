import { Container, Title } from "@/shared/components";

import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { EditSubCategoryForm } from "@/shared/components/admin/categories/EditSubCategoryForm";
import { checkAdmin } from "@/shared/lib/checkAdmin";
import { SubCategoryCard } from "@/shared/components/SubCategoryCard";
import { AddProductVaryButton } from "@/shared/components/admin/categories/AddProductVaryButton";

export default async function AdminSubcategoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  await checkAdmin();
  const params = await props.params;

  const { id } = params;

  const subcategory = await prisma.subCategory.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      productVaries: true,
      category: {
        include: {
          subCategories: true,
        },
      },
    },
  });

  if (!subcategory) {
    return redirect("/404");
  }

  return (
    <Container className="admin-page">
      <Title text="Редактировать подкатегорию" className="font-semibold" />
      <EditSubCategoryForm subcategory={subcategory} className="my-4" />
      <div className="adaptive gap-2 items-center justify-between mt-4">
        <Title text="Вариации:" className="font-semibold" />
        <AddProductVaryButton subCategoryId={id} />
      </div>
      <div className="flex flex-wrap gap-5 justify-between mt-4">
        {subcategory.productVaries.map((vary) => (
          <SubCategoryCard
            id={vary.id}
            name={vary.name}
            imageUrl={vary.imageUrl}
            key={vary.id}
            subCategoryId={subcategory.id}
            inAdmin
            inSubCategory
          />
        ))}
      </div>
    </Container>
  );
}

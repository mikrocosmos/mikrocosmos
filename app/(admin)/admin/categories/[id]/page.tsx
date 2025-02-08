import { EditCategoryForm } from "@/shared/components/admin/categories/EditCategoryForm";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { Container, Title } from "@/shared/components";

import { SubCategoryCard } from "@/shared/components/SubCategoryCard";
import { checkAdmin } from "@/shared/lib/checkAdmin";
import { AddSubCategoryButton } from "@/shared/components/admin/categories/AddSubCategoryButton";

export default async function AdminCategoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  await checkAdmin();
  const params = await props.params;

  const { id } = params;

  const category = await prisma.category.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      subCategories: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!category) {
    return redirect("/404");
  }

  return (
    <Container className="admin-page">
      <Title text="Редактировать категорию" className="font-semibold" />
      <EditCategoryForm category={category} className="mt-4" />
      <div className="adaptive gap-2 items-center justify-between mt-4">
        <Title text="Подкатегории:" className="font-semibold" />
        <AddSubCategoryButton categoryId={id} />
      </div>
      <div className="mt-4 flex justify-between flex-wrap gap-5">
        {category.subCategories.map((subCategory) => (
          <SubCategoryCard
            id={subCategory.id}
            name={subCategory.name}
            imageUrl={subCategory.imageUrl}
            key={subCategory.id}
            categoryId={category.id}
            inAdmin
          />
        ))}
      </div>
    </Container>
  );
}

import { EditCategoryForm } from "@/shared/components/admin/categories/EditCategoryForm";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { Container, Title } from "@/shared/components";

import { SubCategoryCard } from "@/shared/components/SubCategoryCard";
import { Button } from "@/shared/components/ui";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { checkAdmin } from "@/shared/lib/checkAdmin";

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
      <div className="adaptive gap-2 md:gap-0 items-center justify-between mt-4">
        <Title text="Подкатегории:" className="font-semibold" />
        <Link href="/admin/subcategory/add">
          <Button variant="white_accent" className="flex items-center gap-2">
            <CirclePlus strokeWidth={1.5} />
            Добавить подкатегорию
          </Button>
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-5">
        {category.subCategories.map((subCategory) => (
          <SubCategoryCard
            id={subCategory.id}
            inAdmin={true}
            name={subCategory.name}
            imageUrl={subCategory.imageUrl}
            key={subCategory.id}
          />
        ))}
      </div>
    </Container>
  );
}

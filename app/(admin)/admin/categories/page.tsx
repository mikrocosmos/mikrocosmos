import {
  AnimatedLink,
  Categories,
  Container,
  Title,
} from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import Link from "next/link";
import React from "react";
import { CirclePlus, Pencil } from "lucide-react";
import { getUserSession } from "@/shared/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function AdminCategoriesPage() {
  const session = await getUserSession();

  if (!session || session?.role !== ("ADMIN" || "CASHIER")) {
    return redirect("/404");
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return (
    <Container className="admin-page">
      <Title text="Категории" className="font-semibold" />
      <div className="flex flex-col gap-5 text-lg bg-popover py-4 px-8 rounded-md shadow-lg mt-5">
        <Link
          className="flex items-center gap-2 transition hover:text-primary"
          href="/admin/categories/add"
        >
          <CirclePlus size={16} />
          Добавить категорию
        </Link>
        {categories.map((category) => (
          <Link
            href={`/admin/categories/${category.id}`}
            key={category.id}
            className="flex items-center gap-2 transition hover:text-primary"
          >
            <Pencil size={16} />
            {category.name}
          </Link>
        ))}
      </div>
    </Container>
  );
}

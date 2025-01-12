import { Container, Title } from "@/shared/components";

import { prisma } from "@/prisma/prisma-client";
import { Pencil } from "lucide-react";
import { Button } from "@/shared/components/ui";
import Link from "next/link";
import { checkAdmin } from "@/shared/lib/checkAdmin";

export default async function AdminArticlesPage() {
  await checkAdmin();
  const articles = await prisma.article.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return (
    <Container className="admin-page">
      <Title text="Статьи" className="font-semibold" />
      <p>
        Здесь можно настроить текст, который будет отображаться в тех или иных
        частях сайта
      </p>
      <div className="flex flex-wrap mt-4 gap-2">
        {articles.map((article) => (
          <Link key={article.id} href={`/admin/articles/${article.id}`}>
            <Button className="flex items-center gap-2" variant="white_accent">
              {article.name} <Pencil size={16} />
            </Button>
          </Link>
        ))}
      </div>
    </Container>
  );
}

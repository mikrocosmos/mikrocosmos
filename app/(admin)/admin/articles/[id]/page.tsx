import { checkAdmin } from "@/shared/lib/checkAdmin";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { Container, Title } from "@/shared/components";
import { EditArticleForm } from "@/shared/components/admin/article/EditArticleForm";

export default async function ArticlePage(props: {
  params: Promise<{ id: string }>;
}) {
  await checkAdmin();
  const params = await props.params;

  const { id } = params;

  const article = await prisma.article.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!article) {
    return redirect("/404");
  }

  return (
    <Container className="admin-page">
      <Title text="Редактировать статью" className="font-semibold" />
      <EditArticleForm article={article} className="mt-4 w-full" />
    </Container>
  );
}

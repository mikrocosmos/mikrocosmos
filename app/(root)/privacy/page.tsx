import { Container, Title } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import React from "react";

export default async function PrivacyPage() {
  const article = await prisma.article.findFirst({
    where: {
      name: "Политика конфиденциальности",
    },
  });

  if (!article) {
    return redirect("/");
  }
  return (
    <Container className="page pt-4">
      <Title text={article.name} className="font-semibold" />
      <article
        className="py-4"
        dangerouslySetInnerHTML={{ __html: article.text || "" }}
      />
    </Container>
  );
}

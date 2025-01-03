"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/ui/form";
import { Article } from "@prisma/client";
import { Button } from "@/shared/components/ui";
import { updateArticle } from "@/app/actions/admin.article.actions";
import { useRouter } from "next/navigation";
import { ArticleEditor } from "@/shared/components/admin/article/ArticleEditor";

interface Props {
  article: Article;
  className?: string;
}

export const EditArticleForm: React.FC<Props> = ({ article }) => {
  const [value, setValue] = React.useState(article.text);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      await updateArticle(article.id, value);
      router.push("/admin/articles");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-screen">
      <h3>{article.name}</h3>
      <ArticleEditor content={value} onchange={setValue} />
      <div className="mt-4 flex items-center gap-5">
        <Button onClick={() => onSubmit()} variant="white_accent">
          Сохранить
        </Button>
      </div>
    </div>
  );
};

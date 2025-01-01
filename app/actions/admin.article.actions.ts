"use server";

import { prisma } from "@/prisma/prisma-client";

export async function updateArticle(id: number, text: string) {
  try {
    await prisma.article.update({
      where: {
        id,
      },
      data: {
        text,
      },
    });
  } catch (error) {
    console.log("[actions/updateArticle] Server error", error);
  }
}

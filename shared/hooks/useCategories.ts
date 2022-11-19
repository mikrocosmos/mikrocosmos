import { Category } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";

export const useCategories = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const categories = await Api.categories.getAll();
        setCategories(categories);
      } catch (error) {
        console.error("[useCategories]", error);
      }
    })();
  }, []);

  return { categories };
};

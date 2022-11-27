import { Category } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";

export const useCategories = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const categories = await Api.categories.getAll();
        setCategories(categories);
      } catch (error) {
        console.error("[useCategories]", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { categories, loading };
};

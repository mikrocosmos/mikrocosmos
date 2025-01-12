import { SubCategory } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";

export const useSubCategories = () => {
  const [subCategories, setSubCategories] = React.useState<SubCategory[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const subCategories = await Api.subCategories.getAll();
        setSubCategories(subCategories);
      } catch (error) {
        console.error("[useCategories]", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { subCategories, loading };
};

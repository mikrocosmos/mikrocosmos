import { ProductVary } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";

export const useProductVaries = () => {
  const [varies, setVaries] = React.useState<ProductVary[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const varies = await Api.productVaries.getAll();
        setVaries(varies);
      } catch (error) {
        console.error("[useProductVaries]", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { varies, loading };
};

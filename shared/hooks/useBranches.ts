import { Branch } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";

export const useBranches = () => {
  const [branch, setBranch] = React.useState<Branch[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const branch = await Api.branch.getAll();
        setBranch(branch);
      } catch (error) {
        console.error("[useBranches]", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { branch, loading };
};

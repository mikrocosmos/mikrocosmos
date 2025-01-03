import { branchStore } from "@/shared/store";
import React from "react";
import { BranchToProduct } from "@prisma/client";
import { getBtp } from "@/app/actions/btp.actions";

export const useMaxQuantity = (productId: number) => {
  const branchId = branchStore((state) => state.branchId);
  const [btp, setBtp] = React.useState<BranchToProduct[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getBtp(productId, branchId);

        setBtp(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [branchId, productId]);

  return btp.find((item) => item.branchId === branchId)?.totalQuantity || 0;
};

import { Branch, Order } from "@prisma/client";
import React from "react";
import { Api } from "../services/api-client";
import { branchStore } from "@/shared/store";
import { TOrders } from "@/shared/services/orders";

export const useOrders = () => {
  const [orders, setOrders] = React.useState<TOrders[]>([]);
  const [loading, setLoading] = React.useState(true);

  const branchId = branchStore((state) => state.branchId);

  React.useEffect(() => {
    (async () => {
      try {
        const orders = await Api.orders.getAll(branchId);
        setOrders(orders);
      } catch (error) {
        console.error("[useOrders]", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [branchId]);

  return { orders, loading };
};

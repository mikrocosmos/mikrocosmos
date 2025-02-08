"use client";
import React from "react";
import { Skeleton } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { orderStatusMap } from "@/shared/constants";
import { getOrderStatusClass } from "@/shared/lib";
import Link from "next/link";
import { useAdminOrderSearchState } from "@/shared/store/adminOrderSearch";
import { Order } from "@prisma/client";
import { getOrders } from "@/app/actions/admin.orders.actions";
import { OrdersSearch } from "@/shared/components/admin/orders/OrdersSearch";
import { branchStore } from "@/shared/store";
import {OrderCard} from "@/shared/components/admin/orders/OrderCard";

interface Props {
  className?: string;
}

export const Orders: React.FC<Props> = ({ className }) => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const { branchId } = branchStore((state) => state);
  const [loading, setLoading] = React.useState(true);
  const [search, updateSearch] = useAdminOrderSearchState((state) => [
    state.search,
    state.updateSearch,
  ]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getOrders(branchId, search ? search : undefined);
      setOrders(data);
      setLoading(false);
    };
    fetchProducts();
  }, [branchId, search]);

  React.useEffect(() => {
    updateSearch("");
  }, []);
  return (
    <div className={cn("mt-5", className)}>
      <OrdersSearch className="mb-5" />
      {loading ? (
        <Skeleton className="w-96 h-20" />
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id} order={order}/>
        ))
      )}
    </div>
  );
};

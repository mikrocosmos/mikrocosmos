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
          <Link
            href={`/admin/orders/${order.id}`}
            key={order.id}
            className="mb-5 adaptive items-start md:items-center border-2 border-white rounded-3xl p-5 justify-between  gap-5 shadow-lg hover:border-primary hover:shadow-md transition hover:bg-primary group"
          >
            <div className="text-lg font-bold">{order.id}</div>
            <div className="text-lg font-medium">{order.totalPrice} ₽</div>
            <div className="text-lg font-medium">{order.fullName}</div>
            <div className="text-lg font-medium">{order.phone}</div>
            <div className="text-lg font-medium">{order.email}</div>
            <div className="text-lg font-medium">
              {order.createdAt.toLocaleDateString("RU-ru")}
            </div>
            <div
              className={cn(
                "text-lg font-medium p-2 rounded-xl shadow-md transition group-hover:bg-primary group-hover:shadow-none group-hover:text-white",
                getOrderStatusClass(order.status),
              )}
            >
              {orderStatusMap.get(order.status)}
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

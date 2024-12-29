"use client";
import React from "react";
import { useOrders } from "@/shared/hooks";
import { Skeleton } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { orderStatusMap } from "@/shared/constants";
import { getOrderStatusClass } from "@/shared/lib";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Orders: React.FC<Props> = ({ className }) => {
  const { orders, loading } = useOrders();
  return (
    <div className={cn("mt-5", className)}>
      {loading ? (
        <Skeleton className="w-96 h-20" />
      ) : (
        orders.map((order) => (
          <Link
            href={`/admin/orders/${order.id}`}
            key={order.id}
            className="mb-5 flex border-2 border-white rounded-3xl p-5 justify-between items-center gap-5 shadow-lg hover:border-primary hover:shadow-md transition hover:bg-primary group"
          >
            <div className="text-lg font-bold">{order.id}</div>
            <div className="text-lg font-medium">{order.totalPrice} ₽</div>
            <div className="text-lg font-medium">{order.fullName}</div>
            <div className="text-lg font-medium">{order.phone}</div>
            <div className="text-lg font-medium">{order.email}</div>
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

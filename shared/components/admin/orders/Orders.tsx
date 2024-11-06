"use client";
import React from "react";
import { useOrders } from "@/shared/hooks";
import { Skeleton } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";

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
          <div key={order.id} className="mb-5 flex">
            <p className="text-lg font-bold">{order.id}</p>
            <p className="text-lg font-medium ml-5">{order.totalPrice} ₽</p>
            <p className="text-lg font-medium ml-5">{order.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

import React from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { getOrderStatusClass } from "@/shared/lib";
import { orderStatusMap } from "@/shared/constants";
import { Order } from "@prisma/client";

interface Props {
  order: Order;
  className?: string;
}

export const OrderCard: React.FC<Props> = ({ order }) => {
  return (
    <Link
      href={`/admin/orders/${order.id}`}
      key={order.id}
      className="mb-5 adaptive items-center border-2 border-white rounded-3xl p-5 justify-between gap-5 shadow-lg hover:border-primary hover:shadow-md transition hover:bg-primary group"
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
  );
};

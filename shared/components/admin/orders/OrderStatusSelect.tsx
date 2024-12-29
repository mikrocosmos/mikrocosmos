"use client";
import React, { PropsWithChildren } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { orderStatusMap } from "@/shared/constants";
import { Api } from "@/shared/services/api-client";
import { OrderStatus } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { getOrderStatusClass } from "@/shared/lib";

interface Props {
  orderId: number;
  status: string;
  className?: string;
}

export const OrderStatusSelect: React.FC<Props> = ({
  status,
  className,
  orderId,
}) => {
  const orderStatuses = Array.from(orderStatusMap, ([key]) => key);
  const [currentStatus, setCurrentStatus] = React.useState(status);

  return (
    <Select
      value={currentStatus}
      onValueChange={async (value: OrderStatus) => {
        setCurrentStatus(value);
        await Api.orders.changeStatus(orderId, value);
      }}
    >
      <SelectTrigger
        className={cn(
          "border-0 rounded-2xl text-lg px-4 py-2 transition hover:text-black hover:bg-white hover:shadow-lg",
          getOrderStatusClass(currentStatus),
          className,
        )}
      >
        <SelectValue placeholder={orderStatusMap.get(currentStatus)} />
      </SelectTrigger>
      <SelectContent>
        {orderStatuses.map((status) => (
          <SelectItem
            className="text-white transition"
            key={status}
            value={status}
          >
            {orderStatusMap.get(status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

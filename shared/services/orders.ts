import { axiosInstance } from "@/shared/services/instance";
import { Branch, Order, OrderStatus } from "@prisma/client";

export type TOrders = Order & { branch: Branch };

export async function getAll(branchId: number) {
  return (await axiosInstance.get<TOrders[]>(`/orders?branch=${branchId}`))
    .data;
}

export async function changeStatus(id: number, status: OrderStatus) {
  return (await axiosInstance.patch<Order>(`/orders/${id}`, { status })).data;
}

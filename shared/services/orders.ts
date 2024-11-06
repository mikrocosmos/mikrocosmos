import { axiosInstance } from "@/shared/services/instance";
import { Order } from "@prisma/client";

export async function getAll() {
  return (await axiosInstance.get<Order[]>("/orders")).data;
}

import { Branch } from "@prisma/client";
import { axiosInstance } from "./instance";

export const getAll = async () => {
  return (await axiosInstance.get<Branch[]>("/branch")).data;
};

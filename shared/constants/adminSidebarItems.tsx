import {
  Box,
  ChartBarStacked,
  Newspaper,
  RectangleEllipsis,
  Rows4,
  Store,
  Users,
} from "lucide-react";
import React from "react";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export const sidebarItems = (role?: UserRole) => {
  const items = [
    {
      name: "Заказы",
      link: "orders",
      icon: <Rows4 />,
    },
    {
      name: "Товары",
      link: "products",
      icon: <Box />,
    },
    {
      name: "Категории",
      link: "categories",
      icon: <ChartBarStacked />,
    },
    {
      name: "Слайдер",
      link: "slider",
      icon: <RectangleEllipsis />,
    },
    {
      name: "Филиалы",
      link: "branches",
      icon: <Store />,
    },
    {
      name: "Пользователи",
      link: "users",
      icon: <Users />,
    },
    {
      name: "Статьи",
      link: "articles",
      icon: <Newspaper />,
    },
  ];

  if (role === "ADMIN") {
    return items;
  }
  if (role === "CASHIER") {
    return [items[0]];
  }
  return redirect("/404");
};

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

export const sidebarItems = [
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

import React from "react";
import { Jost } from "next/font/google";
import "./globals.css";
import { Providers } from "@/shared/components";
import type { Metadata } from "next";

const jost = Jost({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  fallback: ["Montserrat", "Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Smoky Moon",
  description:
    "Smoky Moon – сеть розничных магазинов по продаже  электронных сигарет, жидкостей, вейпов, комплектующих для вейпов и табачной продукции. На сайте представлен широкий выбор продукции, Удобный каталог, актуальная информация о продуктах и доступные цены.",
  icons: "../favicon.ico",
  // manifest: "../icons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={jost.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

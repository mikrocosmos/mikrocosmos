import React from "react";
import type { Metadata } from "next";
import "../globals.css";
import { AdulthoodMessage, Footer, Header } from "@/shared/components/";
import { CookieMessage } from "@/shared/components/CookieMessage";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Smoky Moon",
  description:
    "Smoky Moon – сеть розничных магазинов по продаже  электронных сигарет, жидкостей, вейпов, комплектующих для вейпов и табачной продукции. На сайте представлен широкий выбор продукции, Удобный каталог, актуальная информация о продуктах и доступные цены.",
  icons: "../favicon.ico",
  manifest: "../icons/site.webmanifest",
};

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const acceptedCookies = cookieStore.get("acceptedCookies");
  const adult = cookieStore.get("adult");
  return (
    <main className="min-h-screen bg-background bg-hero-pattern flex flex-col justify-between">
      <Header />
      {children}
      {!acceptedCookies && <CookieMessage />}
      {!adult && <AdulthoodMessage />}
      <Footer />
    </main>
  );
}

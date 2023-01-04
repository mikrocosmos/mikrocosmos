import React from "react";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={jost.className}>{children}</body>
    </html>
  );
}

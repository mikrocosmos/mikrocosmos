import React from "react";
import { Jost } from "next/font/google";
import "./globals.css";
import { Providers } from "../shared/components/Providers";

const jost = Jost({ subsets: ["latin", "cyrillic"] });

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

"use client";

import { CartProvider } from "./context/cartContext";
import { Manrope } from "next/font/google";
import "./globals.css";

import { ConvexProvider } from "convex/react";
import { convex } from "../app/lib/convexClient";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.className} ${manrope.variable}`}>
      <ConvexProvider client={convex}>
        <CartProvider>
          <body>{children}</body>
        </CartProvider>
      </ConvexProvider>
    </html>
  );
}

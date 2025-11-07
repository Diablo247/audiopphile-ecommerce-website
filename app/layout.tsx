"use client";

import { ReactNode } from "react";
import { CartProvider } from "./context/cartContext";
import { Manrope } from "next/font/google";
import "./globals.css";

import { ConvexProvider, ConvexReactClient } from "convex/react";

// ✅ Initialize Convex client with your public environment variable
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// ✅ Set up Manrope font
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.className} ${manrope.variable}`}>
      <body>
        <ConvexProvider client={convex}>
          <CartProvider>{children}</CartProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}

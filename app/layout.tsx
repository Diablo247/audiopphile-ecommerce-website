"use client";

import { ReactNode } from "react";
import { CartProvider } from "./context/cartContext";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

// ✅ Initialize Convex client only on client side
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.className} ${manrope.variable}`}>
      <body>
        {convex ? (
          <ConvexProvider client={convex}>
            <CartProvider>{children}</CartProvider>
          </ConvexProvider>
        ) : (
          // ✅ Fallback: only happens during server build
          <CartProvider>{children}</CartProvider>
        )}
      </body>
    </html>
  );
}

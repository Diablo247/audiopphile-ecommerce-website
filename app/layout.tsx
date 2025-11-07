"use client";

import { ReactNode, useState, useEffect } from "react";
import { CartProvider } from "./context/cartContext";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const [convex, setConvex] = useState<ConvexReactClient | null>(null);

  // ✅ Initialize Convex client only in the browser
  useEffect(() => {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (convexUrl) {
      const { ConvexReactClient } = require("convex/react");
      setConvex(new ConvexReactClient(convexUrl));
    }
  }, []);

  return (
    <html lang="en" className={`${manrope.className} ${manrope.variable}`}>
      <body>
        {convex ? (
          <ConvexProvider client={convex}>
            <CartProvider>{children}</CartProvider>
          </ConvexProvider>
        ) : (
          // Fallback to render UI during prerender or before hydration
          <CartProvider>{children}</CartProvider>
        )}
      </body>
    </html>
  );
}

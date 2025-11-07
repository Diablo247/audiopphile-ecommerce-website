import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "../app/providers/ConvexProvider";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  title: "Audiophile Checkout",
  description: "Audiophile e-commerce checkout page",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.className} ${manrope.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

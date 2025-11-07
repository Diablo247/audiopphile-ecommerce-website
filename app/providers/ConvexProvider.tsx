// Location: app/providers/ConvexProvider.tsx
"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Initialize the client statically outside the component function
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  // Throw an error early if the variable is missing during client build
  throw new Error("❌ NEXT_PUBLIC_CONVEX_URL is not defined.");
}

const convex = new ConvexReactClient(convexUrl);

export default function Providers({ children }: { children: ReactNode }) {
  // Now we can return the provider immediately
  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}

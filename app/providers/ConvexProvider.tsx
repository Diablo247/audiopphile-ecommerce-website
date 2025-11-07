"use client";

import { ConvexProvider } from "convex/react";
import convex from "@/convex/client";

export default function ConvexProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

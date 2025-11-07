import { ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("No address provided to ConvexReactClient.");
}

export const convex = new ConvexReactClient(convexUrl);

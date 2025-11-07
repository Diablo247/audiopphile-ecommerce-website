// Location: lib/convex.ts (or src/lib/convex.ts)

import { ConvexReactClient } from "convex/react";

const address = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!address) {
  throw new Error(
    "❌ NEXT_PUBLIC_CONVEX_URL is not defined. Add it to your .env.local."
  );
}

export const convex = new ConvexReactClient(address);

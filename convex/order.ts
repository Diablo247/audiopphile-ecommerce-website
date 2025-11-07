// convex/order.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    cart: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    total: v.number(),
    userData: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      address: v.string(),
      zip: v.string(), // 👈 or zip (depending on your frontend)
      city: v.string(),
      country: v.string(),
      paymentMethod: v.string(),
      eMoneyNumber: v.optional(v.string()),
      eMoneyPin: v.optional(v.string()),
    }),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("orders", args);
    return id;
  },
});

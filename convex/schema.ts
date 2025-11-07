import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
// schema.ts
export const order = defineTable({
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
    zip: v.string(), // ✅ renamed here
    city: v.string(),
    country: v.string(),
    paymentMethod: v.string(),
    eMoneyNumber: v.optional(v.string()),
    eMoneyPin: v.optional(v.string()),
  }),
  shipping: v.number(),
  vat: v.number(),
  grandTotal: v.number(),
});


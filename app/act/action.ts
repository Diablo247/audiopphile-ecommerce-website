"use server";

import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(to: string, order: any) {
  try {
    const { name, cart, grandTotal } = order;

    const itemsHtml = cart
      .map(
        (item: any) =>
          `<li>${item.name} x${item.quantity} — $${item.price * item.quantity}</li>`
      )
      .join("");

    const html = `
      <h2>Hi ${name}, thank you for your order!</h2>
      <p>Your items:</p>
      <ul>${itemsHtml}</ul>
      <p><b>Grand Total:</b> $${grandTotal.toFixed(2)}</p>
      <p>We'll notify you when your items are shipped.</p>
    `;

    const response = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>", // ✅ test sender
      to,
      subject: "Your Audiophile Order Confirmation",
      html,
    });

    console.log("✅ Email sent successfully:", response);
    return response;
  } catch (err) {
    console.error("❌ Email send failed:", err);
    throw new Error("Failed to send order confirmation email");
  }
}

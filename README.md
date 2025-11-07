# 🎧 Audiophile E-Commerce Store

A modern, full-stack e-commerce web app built with **Next.js**, **Convex**, **Tailwind CSS**, and **Resend**.  
It allows users to browse products, add them to the cart, and securely place orders with email confirmations.

---

## 🚀 Features

- 🛍️ **Product Catalog** – Browse all available audio products.
- 🛒 **Cart System** – Add, remove, and update items in real-time.
- 💳 **Checkout Flow** – Users can enter billing, shipping, and payment details.
- ✉️ **Email Confirmation** – Orders trigger automatic confirmation emails using [Resend](https://resend.com/).
- 🗂️ **Convex Backend** – Handles order storage, mutations, and real-time updates.
- ⚡ **Responsive UI** – Fully mobile-friendly, designed with Tailwind CSS.
- 🧩 **Smooth Modals** – Checkout success modals and view-more item toggles.
- 🔒 **Form Validation** – Using React Hook Form + Zod schema validation.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **State Management** | React Context API |
| **Database / Backend** | Convex |
| **Email Service** | Resend |
| **Validation** | Zod + React Hook Form |
| **Hosting** | Vercel |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/audiophile.git
cd audiophile

npm install

3️⃣ Set up environment variables

Create a .env.local file in the project root:

NEXT_PUBLIC_CONVEX_URL=<your_convex_deployment_url>
RESEND_API_KEY=<your_resend_api_key>

You can get your Convex deployment URL by running:

npx convex dev



📦 ---Running Locally
Development mode
npm run dev


Visit http://localhost:3000

Production build
npm run build
npm start

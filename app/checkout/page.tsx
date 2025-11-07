"use client";
import { sendOrderEmail } from "../act/action";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/cartContext";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Nav from "@/components/nav";

const checkoutSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Wrong format"),
  phone: z.string().regex(/^\+?[0-9\s()-]+$/, "Wrong format"),
  address: z.string().min(5, "Required"),
  zip: z.string().regex(/^\d{4,6}$/, "Wrong format"),
  city: z.string().min(2, "Required"),
  country: z.string().min(2, "Required"),
  paymentMethod: z.enum(["e-Money", "Cash"]),
  eMoneyNumber: z.string().optional(),
  eMoneyPin: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function OrderSummaryView({
  cart,
  grandTotal,
}: {
  cart: any[];
  grandTotal: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const totalItems = cart.length;
  const visibleItems = expanded ? cart : cart.slice(0, 1);
  const hiddenCount = totalItems - 1;

  return (
    <div className="w-full flex flex-col sm:flex-row bg-[#F1F1F1] rounded-lg overflow-hidden mb-8 transition-all duration-300">
      {/* Left: Item List */}
      <div className="flex-1 bg-[#F1F1F1] p-6 transition-all duration-300">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-4 last:mb-0"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 w-12 h-12 rounded-lg flex justify-center items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="text-[14px] font-semibold">{item.name}</p>
                <p className="text-gray-500 text-[13px]">
                  ${item.price.toLocaleString()}
                </p>
              </div>
            </div>
            <span className="text-gray-500 text-[13px] font-semibold">
              x{item.quantity}
            </span>
          </div>
        ))}

        {/* Summary text when collapsed */}
        {!expanded && totalItems > 1 && (
          <p className="text-sm text-gray-500 mt-2">
            and {hiddenCount} other {hiddenCount > 1 ? "items" : "item"}
          </p>
        )}

        {/* Toggle button */}
        {totalItems > 1 && (
          <button
            className="text-gray-600 text-[13px] font-semibold mt-4 hover:text-[#D87D4A] transition"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "View less" : "View more"}
          </button>
        )}
      </div>

      {/* Right: Grand Total */}
      <div className="bg-black text-white flex flex-col justify-end items-start p-6 w-full sm:w-[200px]">
        <p className="text-gray-400 text-[13px] tracking-[1px] mb-1 uppercase">
          Grand Total
        </p>
        <p className="text-lg sm:text-xl font-bold">
          ${grandTotal.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("e-Money");
  const { cart, total, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = 50;
  const vat = total * 0.2;
  const grandTotal = total + shipping;

  const createOrder = useMutation(api.order.createOrder);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "e-Money" },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setIsProcessing(true);
      const orderData = {
        userData: data,
        cart,
        total,
        shipping,
        vat,
        grandTotal,
      };

      const newOrderId = await createOrder(orderData);

      // ✅ Send confirmation email to user
      await sendOrderEmail(data.email, {
        name: data.name,
        cart,
        grandTotal,
      });

      setOrderId(newOrderId);
      setShowModal(true);
    } catch (error) {
      console.error("❌ Order submission failed:", error);
      alert("Failed to place order. Please try again.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="text-black">
      {/* ✅ Navbar */}
      <div className="relative bg-black w-full z-30">
        <Nav />
      </div>

      {/* ✅ Go Back */}
      <div className="max-w-[1110px] mx-auto mt-8 px-5">
        <Link href="/" className="text-[#00000080] text-[15px]">
          Go Back
        </Link>
      </div>

      {/* ✅ Main Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[1110px] mx-auto px-5  my-10 grid md:grid-cols-[2fr_1fr]  gap-8"
      >
        {/* LEFT SIDE */}
        <div className="bg-white rounded-lg pt-[30px] px-[30px] pb-[30px]">
          <h1 className="text-[32px] font-bold tracking-[1px] mb-4">
            CHECKOUT
          </h1>

          {/* BILLING DETAILS */}
          <div className="flex flex-col mb-[50px]">
            <h2 className="text-[#D87D4A] text-[13px] font-bold tracking-[1px] mb-4">
              BILLING DETAILS
            </h2>
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col sm:flex-row w-full gap-[16px]">
                <div className="w-full sm:w-1/2">
                  <div className="flex flex-row justify-between">
                    <label className="block text-[12px] font-bold">Name</label>
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <input
                    placeholder="Alexei Ward"
                    {...register("name")}
                    className={`input ${errors.name ? "input-error" : ""}`}
                  />
                </div>

                <div className="w-full sm:w-1/2">
                  <div className="flex flex-row justify-between">
                    <label className="block text-[12px] font-bold">
                      Email Address
                    </label>
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <input
                    {...register("email")}
                    placeholder="alexei@mail.com"
                    className={`input ${errors.email ? "input-error" : ""}`}
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-row max-w-[309px] justify-between">
                  <label className="block text-[12px] font-bold">
                    Phone Number
                  </label>
                  {errors.phone && (
                    <p className="text-red-500 text-xs">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <input
                  placeholder="+1 202-555-0136"
                  {...register("phone")}
                  className={`input ${errors.phone ? "input-error" : ""}`}
                />
              </div>
            </div>
          </div>

          {/* SHIPPING INFO */}
          <div className="flex flex-col mb-[50px]">
            <h2 className="text-[#D87D4A] text-[13px] font-bold tracking-[1px] mb-4">
              SHIPPING INFO
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold">
                  Address
                </label>
                <input
                  {...register("address")}
                  className={`input ${errors.address && "input-error"}`}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold">
                    ZIP Code
                  </label>
                  <input
                    {...register("zip")}
                    className={`input ${errors.zip && "input-error"}`}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold">
                    City
                  </label>
                  <input
                    {...register("city")}
                    className={`input ${errors.city && "input-error"}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold">
                  Country
                </label>
                <input
                  {...register("country")}
                  className={`input ${errors.country && "input-error"}`}
                />
              </div>
            </div>
          </div>

          {/* PAYMENT DETAILS */}
          <div className="flex flex-col mb-[50px]">
            <h2 className="text-[#D87D4A] text-[13px] font-bold tracking-[1px] mb-4">
              PAYMENT DETAILS
            </h2>

            <div className="w-full max-w-[309px] mb-4">
              <label className="radio p-3 rounded-lg flex justify-between items-center border mb-2">
                e-Money
                <input
                  type="radio"
                  value="e-Money"
                  {...register("paymentMethod")}
                  checked={paymentMethod === "e-Money"}
                  onChange={() => setPaymentMethod("e-Money")}
                />
              </label>

              <label className="radio p-3 rounded-lg flex justify-between items-center border">
                Cash on Delivery
                <input
                  type="radio"
                  value="Cash"
                  {...register("paymentMethod")}
                  checked={paymentMethod === "Cash"}
                  onChange={() => setPaymentMethod("Cash")}
                />
              </label>
            </div>

            {paymentMethod === "e-Money" ? (
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  {...register("eMoneyNumber")}
                  placeholder="e-Money Number"
                  className="input"
                />
                <input
                  {...register("eMoneyPin")}
                  placeholder="e-Money PIN"
                  className="input"
                />
              </div>
            ) : (
              <div className="text-[#777] text-[13px] rounded-md p-4 flex gap-3 items-start">
                <Image src="/shape.svg" alt="cash" width={25} height={25} />
                <p>
                  The ‘Cash on Delivery’ option enables you to pay in cash when
                  our delivery courier arrives. Please ensure your address is
                  correct.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="bg-white rounded-lg p-8 h-fit flex flex-col">
          <h2 className="text-[18px] font-bold tracking-[1px] mb-6">SUMMARY</h2>

          <div className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center rounded-lg w-16 h-16 bg-[#f1f1f1]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[35px] h-[35px]"
                      />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold">{item.name}</p>
                      <p className="text-[#777] text-[14px]">${item.price}</p>
                    </div>
                  </div>
                  <p className="text-[#777] text-[14px]">x{item.quantity}</p>
                </div>
              ))
            )}
          </div>

          <div className="space-y-2 text-[15px] mt-8">
            <div className="flex justify-between">
              <span className="text-[#777]">TOTAL</span>
              <span className="font-bold">${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777]">SHIPPING</span>
              <span className="font-bold">${shipping}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777]">VAT (INCLUDED)</span>
              <span className="font-bold">${vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-6 text-[18px]">
              <span>GRAND TOTAL</span>
              <span className="text-[#D87D4A]">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full my-[40px] h-12 font-bold text-[13px] text-white bg-[#D87D4A] hover:bg-[#FBAF85]"
            disabled={cart.length === 0}
          >
            {isProcessing ? "PROCESSING..." : "CONTINUE"}
          </button>
        </div>
      </form>

      {/*------ Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg w-full max-w-lg md:max-w-xl p-8 sm:p-10 flex flex-col animate-fadeIn">
            {/**  Checkmark */}
            <div className="bg-[#D87D4A] rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#fff"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>

            {/* ✅ Text */}
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2 textleft">
              THANK YOU
              <br />
              FOR YOUR ORDER
            </h2>
            <p className="text-gray-500  text-[15px] mb-8 text-left">
              You will receive an email confirmation shortly.
            </p>

            <OrderSummaryView cart={cart} grandTotal={grandTotal} />

            <Link
              href="/"
              onClick={() => {
                setShowModal(false);
                clearCart();
              }}
              className="w-full my-[25px] h-12 font-bold text-[13px] text-white bg-[#D87D4A] hover:bg-[#FBAF85] flex justify-center items-center "
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

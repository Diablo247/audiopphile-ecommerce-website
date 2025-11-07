"use client";

import Image from "next/image";
import { useCart } from "../app/context/cartContext";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();

  const { cart, removeFromCart, increaseQty, decreaseQty, total, clearCart } =
    useCart();

  if (cart.length === 0)
    return (
      <div className="p-6 bg-white text-black rounded-lg w-[90%] sm:w-[400px] mx-auto mt-10">
        <h2 className="font-bold text-lg mb-4">Your Cart is Empty</h2>
      </div>
    );

  return (
    <div className="p-[30px] bg-white text-black rounded-lg md:w-[377px] w-[327px] sm:w-[400px] mx-auto mt-10 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Cart ({cart.length})</h2>
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-red-500"
        >
          Remove all
        </button>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-gray-500 text-sm">$ {item.price}</p>
              </div>
            </div>

            <div className="flex items-center bg-[#f1f1f1] px-2 w-24 h-8 justify-between py-1">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-2 text-gray-600 hover:text-[#D87D4A]"
              >
                -
              </button>
              <span className="text-[13px] font-bold">{item.quantity}</span>
              <button
                onClick={() => increaseQty(item.id)}
                className="px-2 text-gray-600  hover:text-[#D87D4A]"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 mb-[25px]">
        <p className="text-gray-500 uppercase text-sm">Total</p>
        <p className="font-bold text-lg">$ {total.toLocaleString()}</p>
      </div>

      <button
        onClick={() => router.push("/checkout")}
        className="w-full h-12 font-bold text-[13px] text-white bg-[#D87D4A] hover:bg-[#FBAF85]"
      >
        Checkout
      </button>
    </div>
  );
}

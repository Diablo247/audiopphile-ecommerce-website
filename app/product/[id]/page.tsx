"use client";
export const dynamic = "force-dynamic";

import { products } from "../../data/products";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Categories from "@/components/categories";
import Info from "@/components/info";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCart } from "../../context/cartContext";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product)
    return (
      <div className="p-10 text-center text-red-600">Product not found.</div>
    );

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
    toast.success(`${product.name} added to cart (${quantity})`, {
      icon: "🛒",
      style: {
        background: "#D87D4A",
        color: "#fff",
        fontWeight: 600,
        borderRadius: "8px",
      },
      duration: 2500,
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="relative bg-black w-full z-30">
          <Nav />
        </div>

        {/* Go Back */}
        <div className="md:w-[1110px] w-[327px] sm:w-[689px]">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-orange-500 transition mt-[50px] mb-[75px]"
          >
            Go Back
          </button>
        </div>

        {/* Product Intro */}
        <div className="sm:w-[689.5px] sm:h-[480px] md:w-[1110px] md:h-[560px] flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-[100px]">
          <div className="flex items-center justify-center w-[327px] h-[327px] sm:w-[281px] sm:h-[480px] md:w-[540px] md:h-[560px] bg-[#f1f1f1] mb-[24px]">
            <img
              src={product.image}
              alt={product.name}
              className="h-[243px] w-[220px] md:w-[349px] md:h-[385px]"
            />
          </div>
          <div className="w-[327px] md:w-[445.5px]">
            {product.slug && (
              <p className="font-normal tracking-[10px] text-[14px] text-[#D87D4A] mb-[24px] sm:mb-6">
                {product.slug}
              </p>
            )}
            <h1 className="font-bold text-[28px] mb-[24px] text-left">
              {product.name}
            </h1>
            <h2 className="font-bold text-[18px] mb-[24px] text-left text-gray-600 uppercase">
              {product.category}
            </h2>
            <p className="text-[15px] font-medium text-[rgba(0,0,0,0.5)] mb-4 text-left">
              {product.description}
            </p>
            <p className="mb-[24px] font-bold text-[18px]">
              ${product.price.toLocaleString()}
            </p>
            <div className="flex justify-start gap-[16px] items-center">
              <div className="w-[120px] px-[19px] flex justify-between items-center h-[48px] bg-[#f1f1f1]">
                <button onClick={decrease}>-</button>
                <span>{quantity}</span>
                <button onClick={increase}>+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-40 h-12 font-bold text-[13px] text-white bg-[#D87D4A] hover:bg-[#FBAF85]"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>

        {/* Features + Included Items */}
        <div className="md:w-[1110px] w-[327px] sm:w-[689px] flex flex-col md:flex-row gap-4 mb-[40px]">
          <div className="md:w-[635px] md:mr-4">
            <h2 className="text-2xl font-bold uppercase mb-6">Features</h2>
            {product.features?.map((feature, index) => (
              <p
                key={index}
                className="md:w-[635px] mb-[19px] text-[15px] font-medium text-[rgba(0,0,0,0.5)]"
              >
                {feature}
              </p>
            ))}
          </div>

          <div className="sm:w-full sm:flex-row sm:justify-between md:flex-col md:justify-start flex flex-col mb-[48px]">
            <h2 className="text-2xl font-bold uppercase mb-6">In the box</h2>
            <ul className="space-y-3">
              {product.includedItems?.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-[#D87D4A] font-bold">
                    {item.quantity}x
                  </span>
                  <span className="text-[rgba(0,0,0,0.5)] text-[15px]">
                    {item.item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        <div className="w-[327px] sm:w-[690px] md:w-[1110px] flex flex-col sm:flex-row gap-5">
          <div className="justify-between flex-col flex md:h-[592px] sm:h-[368px]">
            <img
              className="w-[327px] sm:w-[277px] mb-[40px] sm:mb-0 md:w-[445px]"
              src={product.otherImages?.[0]?.img ?? ""}
              alt="otherimage"
            />
            <img
              className="w-[327px] sm:w-[277px] md:w-[445px]"
              src={product.otherImages?.[1]?.img ?? ""}
              alt="otherimage"
            />
          </div>
          <img
            className="w-[327px] sm:w-[395px] md:w-[635px]"
            src={product.otherImages?.[2]?.img ?? ""}
            alt="otherimage"
          />
        </div>

        {/* You may also like */}
        {product.alsoLike && (
          <div className="flex justify-center items-center flex-col my-[100px]">
            <h2 className="text-[24px] sm:text-[32px] uppercase mb-[24px] font-bold">
              You may also like
            </h2>
            <div className="flex flex-col gap-[11px] md:gap-[30px] sm:flex-row">
              {product.alsoLike.map((alt, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center mb-[56px] flex-col"
                >
                  <div className="w-[327px] sm:w-[223px] md:w-[350px] sm:h-[318px] rounded-[8px] h-[120px] bg-[#F1F1F1] flex justify-center items-center">
                    <img
                      src={alt.img}
                      alt={alt.name}
                      className="w-[73px] sm:w-[148.32px]"
                    />
                  </div>
                  <h3 className="font-bold uppercase text-[24px] my-[32px]">
                    {alt.name}
                  </h3>
                  <Link
                    href={alt.href}
                    className="w-40 flex justify-center items-center h-12 font-bold text-[13px] text-white bg-[#D87D4A] hover:bg-[#FBAF85]"
                  >
                    See Product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <Categories />
        <Info />
      </div>

      <Footer />
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Cart from "./cart"; // ✅ Make sure you have the Cart component from previous step
import { useCart } from "../app/context/cartContext";

interface NavItem {
  name: string;
  href: string;
}

export default function Nav() {
  const navItems: NavItem[] = [
    { name: "HOME", href: "/" },
    { name: "HEADPHONES", href: "/headphones" },
    { name: "SPEAKERS", href: "/speakers" },
    { name: "EARPHONES", href: "/earphones" },
  ];
  const {cart} = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCart = () => setShowCart(!showCart);

  return (
    <>
      <nav className="w-full sm:px-10 md:px-[165px] flex justify-center text-white  z-50">
        <div className="border-b border-white/20 w-full px-5 sm:px-0 flex items-center justify-between h-[93px] relative">
          {/* ✅ Mobile Menu Icon */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            <Image src="/menu.svg" alt="menu" width={24} height={24} />
          </button>

          {/* ✅ Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Audiophile Logo"
              width={143}
              height={25}
              priority
            />
          </Link>

          {/* ✅ Desktop Nav Links */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white text-[13px] font-bold tracking-[2px] hover:text-[#D87D4A] transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* ✅ Cart Icon */}
          <button
            className="focus:outline-none relative"
            aria-label="Cart"
            onClick={toggleCart}
          >
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#D87D4A] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
            <Image src="/cart.svg" alt="cart" width={24} height={24} />
          </button>

          {/* ✅ Mobile Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-[93px] left-0 w-full bg-[#121212] flex flex-col items-center py-8 md:hidden border-t border-white/10 animate-slideDown">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-[15px] font-semibold py-3 hover:text-[#D87D4A] transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ✅ Cart Modal */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50"
          onClick={() => setShowCart(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="animate-fadeIn ">
            <Cart />
          </div>
        </div>
      )}
    </>
  );
}

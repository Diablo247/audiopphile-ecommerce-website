"use client";

import Link from "next/link";
import { useState } from "react";

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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full sm:px-10 md:px-[165px] bg-[#0000]  flex justify-center ">
      <div className="border-b-[rgba(255,255,255,0.2)] w-full px-5 sm:px-0  border-b-2 flex items-center justify-between h-[93px]">
        {/* Menu Icon */}
        <img src="/menu.svg" alt="menu" className="cursor-pointer md:hidden " onClick={toggle} />
        <img
          src={"/logo.png"}
          alt="menu"
          className="cursor-pointer w-[143px]"
        />

        {/* Nav Links */}
        <div className="hidden sm:hidden md:flex gap-6  ">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className=" text-white hover:text-[#D87D4A]"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Cart Icon */}
        <img src="/cart.svg" alt="cart" className="cursor-pointer" />
      </div>
    </div>
  );
}

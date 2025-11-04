import Link from "next/link";

export default function Footer() {
  const navLinks = [
    { text: "HOME", href: "/" },
    { text: "ABOUT", href: "/about" },
    { text: "PRODUCTS", href: "/products" },
    { text: "CONTACTS", href: "/contact" },
  ];

  return (
    <div className="bg-black pb-[38px] flex flex-col  items-center sm:items-start sm:px-[39px]">
      <div className="w-[101px] h-1 bg-[rgba(216,125,74,1)]" />

      <div className="flex flex-col items-center md:flex-row md:mt-[75px] sm:items-start md:mb-9 md:justify-between w-full " >
        <img
          src="/logo.png"
          alt="audiophile"
          className="w-[143px] mt-[52px] mb-12 sm:mb-8  md:m-0"
        />

        <ul className=" flex flex-col gap-4  sm:flex-row  sm:gap-[34px]  ">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="text-[rgb(255,255,255)] flex justify-center items-center h-[25px] font-bold text-[13px] hover:text-[#D87D4A]"
            >
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[rgba(255,255,255,0.5)] text-[15px] w-[327px] text-center mt-12 sm:w-full font-normal sm:text-left md:w-[540px] ">
        Audiophile is an all in one stop to fulfill your audio needs. We're a
        small team of music lovers and sound specialists who are devoted to
        helping you get the most out of personal audio. Come and visit our demo
        facility - we’re open 7 days a week.
      </p>

      <div className="flex  w-full justify-center items-center flex-col sm:flex-row sm:justify-between sm:mt-[80px]">
        <p className="text-[rgba(255,255,255,0.5)] font-bold text-[15px] mt-12 sm:mt-0 ">
          Copyright 2021. All Rights Reserved
        </p>

        <div className="flex w-full justify-center items-center gap-4 mt-12 sm:w-[104px] sm:mt-0 ">
          <img src={"/facebook.svg"} alt="facebook" />
          <img src={"/twitter.svg"} alt="twitter" />
          <img src={"/insta.svg"} alt="insta" />
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function categories() {
  const categories =  [
    { name: "HEADPHONES", src: "/category-headphones.svg", href:"/headphones"  },
    { name: "SPEAKERS", src: "/category-speakers.svg", href:"/speakers" },
    { name: "EARPHONES", src: "/category-earphones.svg",  href:"/earphones" },
  ];

  return (
    <div className="flex flex-col w-full gap-[75px] mt-[100px]  items-center sm:flex-row sm:gap-2.5 justify-center ">
      {categories.map((category, index) => (
        <div
          className="w-[327px]  h-[165px] flex flex-col justify-end items-center bg-[#F1F1F1] rounded-lg relative pb-[22px] sm:w-[223px] sm:h-[217px]  md:w-[350px] md:h-[204px]  "
          key={index}
        >
          <img
            src={category.src}
            alt={category.name}
            className="absolute bottom-25 w-[103px] h-auto md:w-[125px] sm:bottom-40 md:bottom-30"
          />

          <h3 className="text-[15px] font-bold text-black md:text-[18px]">
            {category.name}
          </h3>

          <Link
            href={category.href}
            className="flex justify-center items-center gap-2.5 "
          >
            {" "}
            <span className="flex justify-center items-center font-bold text-[13px] hover:text-[#D87D4A] text-[rgba(0,0,0,0.5)]">
              shop
            </span>{" "}
            <img className="w-[5px] h-2.5" src={"/arrow.png"} />{" "}
          </Link>
        </div>
      ))}
    </div>
  );
}

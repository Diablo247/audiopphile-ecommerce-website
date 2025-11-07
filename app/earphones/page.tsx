export const dynamic = "force-dynamic";

import Nav from "@/components/nav";
import Info from "@/components/info";
import Link from "next/link";
import { products } from "../data/products";
import Categories from "@/components/categories";
import Footer from "@/components/footer";

export default function headphones() {
  const earphones = products.filter(
    (product) => product.category === "EARPHONES"
  );

  const earphonesOne = earphones[0];

  return (
    <>
      <div className="flex flex-col items-center pb-[100px] ">
        <div className="absolute w-full z-30">
          <Nav />
        </div>
        <div className="header">
          {" "}
          <h1 className="text-white font-bold text-[28px]">EARPHONES</h1>{" "}
        </div>

        {/**first item */}
        <div className="pageitem-one">
          <div className="image">
            <img
              src={earphonesOne.image}
              className="h-[243px] w-[220px] md:w-[349px] md:h-[385px]"
              alt="help"
            />
          </div>

          <div className="flex justify-center items-center flex-col pt-6 sm:max-w-[572px] md:max-w-[445px] md:items-start  ">
            {" "}
            <p className=" font-normal tracking-[10px] text-[14px] text-[#D87D4A]  mb-[24px]  sm:mb-6 ">
              {earphonesOne.slug}
            </p>
            <h1 className="text-center font-bold  text-[28px] mb-4 md:text-left">
              {earphonesOne.name}
              <br /> {earphonesOne.category}
            </h1>
            <p className="text-center text-[15px] font-medium text-[rgba(0,0,0,0.5)] mb-4 md:text-left">
              {earphonesOne.description}
            </p>
            <Link href={`/product/${earphonesOne.id}`}>
              <button className="w-40  h-12 font-bold text-[13px] text-white bg-[#D87D4A] hover:bg-[#FBAF85]">
                See Product
              </button>
            </Link>
          </div>
        </div>

        <Categories />
        <Info />
      </div>
      <Footer />
    </>
  );
}

import Footer from "@/components/footer";
import Info from "@/components/info";
import Categories from "@/components/categories";
import Nav from "@/components/nav";
import Items from "@/components/items";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="absolute w-full z-30">
        <Nav />{" "}
      </div>

      <div className="w-full h-[600px] overflow-hidden bg-[#121212] hero-img sm:h-[729px] text-white flex justify-center items-center md:gap-[49px] pt-[50px]">
        <div className="flex flex-col justify-center items-center w-[328px] z-20 md:items-start ">
          {" "}
          <p className="font-normal tracking-[10px] text-[14px] text-[rgba(255,255,255,0.5)]  mb-4  sm:mb-6 ">
            NEW PRODUCT
          </p>
          <h1 className="font-bold text-[36px] mb-6  sm:text-[56px] md:text-left">
            XX99 Mark II <br /> HeadphoneS
          </h1>
          <p className=" text-[15px] leading-[25px] text-center font-normal text-[rgba(255,255,255,0.75)] mb-7 md:text-left sm:mb-10 ">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.{" "}
          </p>
          <Link href={`/product/1`}>
            <button className="w-40  h-12 font-bold text-[13px] text-white bg-[#D87D4A] hover:bg-[#FBAF85]">
              See Product
            </button>
          </Link>
        </div>
        <img
          src={"/hero-mobile.png"}
          alt=""
          className="hidden w-[708.8px] opacity-[0.5] h-[886px] z-10 md:flex"
        />
      </div>

      <Categories />
      <Items />
      <Info />
      <Footer />
    </div>
  );
}

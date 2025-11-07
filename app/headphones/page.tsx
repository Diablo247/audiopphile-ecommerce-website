export const dynamic = "force-dynamic";
import Nav from "@/components/nav";
import Info from "@/components/info";
import Link from "next/link";
import { products } from "../data/products";
import Categories from "@/components/categories";
import Footer from "@/components/footer";
export default function headphones() {
  const headphones = products.filter(
    (product) => product.category === "HEADPHONES"
  );

  const headphonesOne = headphones[0];
  const headphonesTwo = headphones[1];
  const headphonesThree = headphones[2];

  return (
    <>
      <div className="flex flex-col items-center pb-[100px] ">
        <div className="absolute w-full z-30">
          <Nav />
        </div>
        <div className="header">
          {" "}
          <h1 className="text-white font-bold text-[28px]">HEADPHONE</h1>{" "}
        </div>

        {/**first item */}
        <div className="pageitem-one">
          <div className="image">
            <img
              src={headphonesOne.image}
              className="h-[243px] w-[220px] md:w-[349px] md:h-[385px]"
              alt="help"
            />
          </div>

          <div className="flex justify-center items-center flex-col pt-6 sm:max-w-[572px] md:max-w-[445px] md:items-start  ">
            {" "}
            <p className=" font-normal tracking-[10px] text-[14px] text-[#D87D4A]  mb-[24px]  sm:mb-6 ">
              {headphonesOne.slug}
            </p>
            <h1 className="text-center font-bold  text-[28px] mb-4 md:text-left">
              {headphonesOne.name}
              <br /> {headphonesOne.category}
            </h1>
            <p className="text-center text-[15px] font-medium text-[rgba(0,0,0,0.5)] mb-4 md:text-left">
              {headphonesOne.description}
            </p>
            <Link href={`/product/${headphonesOne.id}`}>
              <button className="w-40  h-12 font-bold text-[13px] text-white bg-[#D87D4A] hover:bg-[#FBAF85]">
                See Product
              </button>
            </Link>
          </div>
        </div>

        {/**second item */}
        <div className="pageitem-two">
          <div className="image">
            <img
              src={headphonesTwo.image}
              className="h-[243px] w-[220px] md:w-[349px] md:h-[385px]"
              alt="help"
            />
          </div>

          <div className="flex justify-center items-center flex-col pt-[24px] sm:max-w-[572px] md:max-w-[445px] md:items-start ">
            {" "}
            <p className=" font-normal tracking-[10px] text-[14px] text-[#D87D4A]  mb-[24px]  sm:mb-6 ">
              {headphonesTwo.slug}
            </p>
            <h1 className="text-center font-bold  text-[28px] mb-4 md:text-left">
              {headphonesTwo.name}
              <br /> {headphonesTwo.category}
            </h1>
            <p className="text-center text-[15px] font-medium text-[rgba(0,0,0,0.5)] mb-4 md:text-left">
              {headphonesTwo.description}
            </p>
            <Link href={`/product/${headphonesTwo.id}`}>
              <button className="w-40  h-12 font-bold text-[13px] text-white bg-[#D87D4A] hover:bg-[#FBAF85]">
                See Product
              </button>
            </Link>
          </div>
        </div>
        {/**third item */}

        <div className="pageitem-one">
          <div className="image">
            <img
              src={headphonesThree.image}
              className="h-[243px] w-[220px] md:w-[349px] md:h-[385px]"
              alt="help"
            />
          </div>

          <div className="flex justify-center items-center flex-col pt-[24px] sm:max-w-[572px] md:max-w-[445px] md:items-start  ">
            {" "}
            <p className=" font-normal tracking-[10px] text-[14px] text-[#D87D4A]  mb-[24px]  sm:mb-6 ">
              {headphonesThree.slug}
            </p>
            <h1 className="text-center font-bold  text-[28px] mb-4  sm:text-10 md:text-left">
              {headphonesThree.name}
              <br /> {headphonesThree.category}
            </h1>
            <p className="text-center text-[15px] font-medium text-[rgba(0,0,0,0.5)]  mb-4 md:text-left">
              {headphonesThree.description}
            </p>
            <Link href={`/product/${headphonesThree.id}`}>
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

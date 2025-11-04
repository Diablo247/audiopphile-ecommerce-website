export default function info() {
  return (
    <div className="w-full flex flex-col justify-center items-center my-[120px] md:flex-row-reverse md:gap-[125px] ">
      <div className="info-img" />

      <div className="">
        <h1 className="text-center mt-10 mb-8 font-bold text-[28px]  sm:mt-[63px] sm:text-[40px] md:mt-0 md:text-left ">
          BRINGING YOU THE <br className="sm:hidden md:flex" />{" "}
          <span className="text-[#D87D4A]">BEST</span>{" "}
          <br className="hidden sm:flex md:hidden " />
          AUDIO GEAR
        </h1>
        <p className="text-center text-[15px] font-medium text-[rgba(0,0,0,0.5)] sm:max-w-[573px]   md:max-w-[445px]  md:text-left">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </div>
  );
}

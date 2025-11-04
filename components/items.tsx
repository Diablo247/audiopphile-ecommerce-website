export default function items() {
  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col mt-[100px]">
      {/** first */}
      <div className="first-img flex justify-end items-center flex-col md:items-start md:pl-[650px]   ">
        <h2 className="text-[28px] text-center text-white font-bold mb-[30px] sm:text-[56px] md:text-left">
          ZX9 <br />
          SPEAKER
        </h2>
        <p className="tetx-[15px] text-[rgba(255,255,255,0.75)] text-center sm:max-w-[349px] md:text-left mb-[40px]">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <button className="w-40  h-12 font-bold mb-16 text-[13px] text-white bg-[#000] hover:bg-[#4C4C4C]">
          See Product
        </button>
      </div>
      {/** second */}
      <div className="second-img px-[36] flex flex-col justify-center sm:">
        <h2 className="text-[28px] mb-[36px] font-bold">ZX7 SPEAKER</h2>
        <button className="w-40  h-12 font-bold text-[13px] hover:text-white border-2 border-[#000] hover:bg-[#000]">
          See Product
        </button>
      </div>

      {/** third */}
      <div className=" flex flex-col gap-6 sm:gap-[11px] justify-center sm:flex-row md:gap-[30px] ">
        <div className="third-img" />
        <div className="px-[36px] w-[327px] h-[200px]  sm:w-[339px] sm:h-[320px] rounded-[8px] md:w-[540px]   bg-[#f1f1f1] flex flex-col justify-center ">
          <h2 className="text-[28px] font-bold mb-[30px]">YX1 EARPHONES</h2>
          <button className="w-40  h-12 font-bold text-[13px] hover:text-white border-2 border-[#000] hover:bg-[#000]">
            See Product
          </button>
        </div>
      </div>
    </div>
  );
}

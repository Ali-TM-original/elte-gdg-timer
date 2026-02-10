import React from "react";

const DigitBox = ({ digit }: { digit: string }) => {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-white text-[#2B2B2B] shadow-md w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28">
      <span className="tabular-nums text-3xl sm:text-4xl md:text-5xl font-semibold">
        {digit}
      </span>
    </div>
  );
};

export default DigitBox;

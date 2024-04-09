import React from 'react';

export default function Hamburger() {
  return (
    <div className="flex flex-col relative w-[26px] h-[28px]">
      <div className="absolute inset-x-0 top-0 h-[2px] ui-open:h-[3px] w-[24px] ui-open:w-[34px] rounded-full bg-yellow transition-all duration-150 ui-open:rotate-45 origin-left" />
      <div className="absolute inset-x-0 top-0 mt-[12px] h-[2px] w-[24px] rounded-full bg-orange transition-opacity duration-150 ui-open:opacity-0" />
      <div className="absolute inset-x-0 top-0 mt-[24px] h-[2px] w-[24px] ui-open:h-[3px] ui-open:w-[34px] rounded-full bg-purple transition-all duration-150 ui-open:-rotate-45 origin-left" />
    </div>
  );
}

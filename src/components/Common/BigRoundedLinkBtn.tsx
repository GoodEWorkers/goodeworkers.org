import { Link } from 'gatsby';
import React from 'react';

export default function BigRoundedLinkBtn({upperSmallText, bigBtmText, href, className}: {upperSmallText:string, bigBtmText: string, href:string, className?:string}) {
  return (
    <Link
      to={href}
      className={`w-full max-w-[336px] px-7 py-5 rounded-full flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform ease-in ${className}`}
    >
      {upperSmallText && <span className="text-sm sm:text-base font-medium">{upperSmallText}</span>}
      <span className="text-3xl sm:text-4xl font-clash font-bold text-center">
        {bigBtmText}
      </span>
    </Link>
  );
}

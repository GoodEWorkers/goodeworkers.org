import React from 'react';
import Encircled from '../Miscs/Encircled';

export default function LandingHeader() {
  const headerText1 = 'Helping ';
  const headerText2 = 'nonprofits';
  const headerText3 = ' go remote';
  const headerText4 =
    'As a nonprofit we believe that everyone has the power to make a difference in the world, and we want to make it easier for people to do that from the comfort of their own homes.';
  const headerText5 =
    "If you're a nonprofit, we can help you with web development, content marketing, design, or animation.";

  return (
    <header className="pt-8 md:pt-12 lg:pt-24 text-grey">
      <h1 className="text-4xl md:text-5xl lg:text-7xl text-center">
        <span className="text-yellow font-clash font-medium">Good</span>
        <span className="text-orange font-clash font-semibold">e</span>
        <span className="text-purple font-clash font-medium">Workers</span>
        <br />
        <span className="inline-block mt-4 md:mt-8 lg:mt-12 font-medium">
          {headerText1}
        </span>
        <Encircled text={headerText2} className="font-bold" />
        <span className="font-medium">{headerText3}</span>
      </h1>
      <p className="mt-8 md:mt-12 lg:mt-16 px-4 sm:px-16 max-w-screen-md mx-auto text-sm md:text-base text-center leading-snug md:leading-tight">
        {headerText4}
      </p>
      <p className="mt-4 px-4 sm:px-16 max-w-screen-md mx-auto text-sm md:text-base font-bold text-center leading-snug md:leading-tight">
        {headerText5}
      </p>
    </header>
  );
}

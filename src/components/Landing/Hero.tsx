import React from 'react';
import { Link } from 'gatsby';
import Webnet from '../../assets/icons/webnet.svg';
import Chat from '../../assets/icons/chat.svg';
import Magnify from '../../assets/icons/magnify.svg';
import Hexagone from '../../assets/icons/hexagone.svg';
import Heart from '../../assets/icons/heart.svg';
import BigRoundedLinkBtn from '../Common/BigRoundedLinkBtn';

export default function Hero() {
  const heroCards = [
    {
      icon: <Webnet />,
      title: 'Website\ncreation',
    },
    {
      icon: <Chat />,
      title: 'Content\nmarketing',
    },
    {
      icon: <Magnify />,
      title: 'SEO\nOptimization',
    },
    {
      icon: <Hexagone />,
      title: 'Audits\nand advice',
    },
    {
      icon: <Heart />,
      title: 'And much\nmore...',
    },
  ];

  const heroText1 = 'I am a';
  const heroText2 = 'nonprofit';
  const heroText3 = 'I want to';
  const heroText4 = 'help';
  const heroText5 = ' can help you ';
  const heroText6 = 'go digital';
  const heroText7 = `We provide a variety of services, including website development, content marketing, and social media management. We also offer a free consultation to help you understand your needs and how we can help you achieve your goals.`;

  return (
    <section id="hero">
      <div className="flex flex-col mx-4 sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 mt-12 sm:mt-20 sm:justify-center sm:space-x-6 md:space-x-12 relative z-10">
        <BigRoundedLinkBtn upperSmallText={heroText1} bigBtmText={heroText2} className='bg-yellow' href="/#contact" />
        <BigRoundedLinkBtn upperSmallText={heroText3} bigBtmText={heroText4} className='bg-purple' href="/#contact" />
      </div>
      <div className="bg-white relative -mt-12 px-8 pt-20 lg:pt-32 pb-6 md:pb-16 lg:pb-28 rounded-xl sm:rounded-2xl lg:rounded-3xl lg:justify-between">
        <div className="flex flex-col lg:flex-row lg:space-x-8 max-w-screen-xl mx-auto">
          <div className="px-4 sm:px-16 lg:px-0 max-w-screen-md mx-auto lg:mx-0 lg:flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px]">
              <span className="font-clash font-medium">
                Good
                <span className="font-semibold">e</span>
                Workers
              </span>
              <span className="font-inter font-medium">
                {heroText5}
                <span className="font-bold">{heroText6}</span>
              </span>
            </h2>
            <p className="mt-10 font-bold leading-tight">{heroText7}</p>
          </div>
          <div className="mt-10 lg:mt-0 grid grid-cols-2 sm:flex sm:flex-wrap w-full max-w-80 sm:max-w-xl sm:justify-center mx-auto gap-1.5 md:gap-3 xl:gap-5 lg:flex-1">
            {heroCards.map((heroCard, index) => (
              <div
                key={heroCard.title}
                title={heroCard.title}
                className={`hover:opacity-85 aspect-square flex flex-col items-center justify-center rounded-lg sm:w-36 md:w-40 ${
                  index === heroCards.length - 1
                    ? 'bg-orange text-white'
                    : 'bg-grey'
                }`}
              >
                <div className="[&>*]:w-5 [&>*]:h-5">{heroCard.icon}</div>
                <p className="mt-4 text-sm md:text-base font-bold whitespace-pre-line text-center">
                  {heroCard.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

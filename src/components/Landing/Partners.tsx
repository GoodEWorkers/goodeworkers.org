import React from 'react';
import Encircled from '../Miscs/Encircled';
import Gatsby from '../../assets/icons/gatsby.svg';
import Lili from '../../assets/icons/lili.svg';

export default function Partners() {
  const partnersIcons = [
    {
      id: 1,
      icon: <Gatsby />,
      classNames: '',
      name: 'Gatsby',
    },
    {
      id: 2,
      icon: <Lili />,
      classNames: '',
      name: 'Lili Schmitt',
    },
  ];

  const partnersText1 = 'With the help of our ';
  const partnersText2 = 'partners';

  return (
    <section id="partners">
      <div className="mt-10 text-white pb-20 xl:pb-32">
        <h2 className="font-medium text-3xl sm:text-4xl md:text-5xl xl:text-[54px] text-center">
          {partnersText1}
          <br className="xl:hidden" />
          <Encircled text={partnersText2} className="font-bold" />
        </h2>
        {/* Partners Cards Mobile Version */}
        {/* EDIT: Hidden for now as not enough cards md:hidden -> hidden*/}
        <div className="partnersCards hidden mt-12 w-full text-sm overflow-hidden">
          <div className="slider flex xl:pt-24 xl:pb-32 w-fit">
            {partnersIcons.map((partner) => (
              <div
                key={`${partner.name}-${partner.id}`}
                className="w-40 mr-5 las"
              >
                <div className="w-40 h-40 bg-black-light rounded-xl flex flex-col justify-center items-center text-grey">
                  {partner.icon}
                </div>
                <p className="mt-4 text-center font-bold">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Partners Cards Desktop Version */}
        {/* EDIT: Always visible as not enough cards hidden md:block -> ""*/}
        <div className="mt-20 xl:mt-24 w-full overflow-hidden">
          <div className="slider flex w-fit mx-auto">
            {partnersIcons.slice(0, 4).map((partner) => (
              <div
                key={`${partner.name}-${partner.id}`}
                className="w-40 mr-5 las"
              >
                <div className="w-40 h-40 bg-black-light rounded-xl flex flex-col justify-center items-center text-grey">
                  {partner.icon}
                </div>
                <p className="mt-4 text-center font-bold">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

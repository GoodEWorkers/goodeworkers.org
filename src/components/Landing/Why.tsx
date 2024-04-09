import React from 'react';
import Encircled from '../Miscs/Encircled';
import Map from '../../assets/icons/map.svg';
import Dollar from '../../assets/icons/dollar.svg';
import Calendar from '../../assets/icons/calendar.svg';

export default function Why() {
  const whyCards = [
    {
      icon: <Map />,
      classNames: 'bg-yellow text-black-light',
      title: 'No geographical \nrestrictions',
      text: 'We are not a local association, we welcome all volunteers from around the globe.',
    },
    {
      icon: <Calendar />,
      classNames: 'bg-orange text-white',
      title: 'A streamlined \norganization',
      text: 'We excel in the art of remote work, working asynchronously, with all tasks predefined to enhance efficiency for all stakeholders.',
    },
    {
      icon: <Dollar />,
      classNames: 'bg-purple text-black-light',
      title: 'Reduced \ncost',
      text: 'With no physical premises or offices, our infrastructure costs are significantly minimized, benefiting everyone.',
    },
  ];
  const whyText1 = 'Making distance an ';
  const whyText2 = 'advantage';
  const whyText3 =
    'Throughout the duration of your project, you will have a dedicated interlocutor';
  const whyText4 =
    ' with whom you will regularly communicate via phone, email, video conferencing, or chat. ';
  const whyText5 =
    'This way, you will be kept informed of progress and any potential setbacks.';

  return (
    <section id="why" className="pb-12 md:pb-16 xl:pb-24">
      <div className="mt-10 sm:mt-16 md:mt-32 text-white text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] text-grey font-medium leading-[1.2] md:leading-tight lg:leading-tight">
          {whyText1}
          <br className="min-[1200px]:hidden" />
          <span className="inline-block relative">
            <Encircled text={whyText2} className="font-bold" />
            {/* Why arrow image */}
            <span className="block absolute top-[5px] sm:top-[10px] md:top-[15px] lg:top-[-5px] xl:top-[5px] right-[-85px] sm:right-[-105px] md:right-[-130px] lg:right-[-200px] w-[120px] sm:w-[142px] md:w-[175px] lg:w-[250px] h-[72px] sm:h-[85px] md:h-[105px] lg:h-[150px] bg-[url('../images/why_arrow.svg')] bg-no-repeat bg-center bg-contain" />
          </span>
        </h2>
        <p className="mt-8 sm:mt-12 md:mt-12 lg:mt-12 px-8 sm:px-12 max-w-md sm:max-w-screen-md mx-auto text-sm md:text-base text-ashgray leading-tight md:leading-tight">
          <span className="font-bold">{whyText3}</span>
          <span className="font-medium">{whyText4}</span>
          <br className="hidden lg:block" />
          {whyText5}
        </p>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-1.5 sm:gap-3 md:gap-5 px-2 sm:px-4">
        {whyCards.map((whyCard) => (
          <div
            key={whyCard.title}
            className={`aspect-square min-[580px]:basis-60 md:basis-80 flex-grow max-w-80 min-[580px]:max-w-[48%] md:max-w-[360px] flex flex-col items-center justify-center text-center px-8 min-[580px]:px-4 sm:px-8 rounded-lg ${whyCard.classNames}`}
          >
            <div className="[&>*]:w-6 [&>*]:h-6">{whyCard.icon}</div>
            <p className="mt-4 whitespace-pre-line font-bold leading-tight">
              {whyCard.title}
            </p>
            <p className="mt-4 text-sm md:text-base md:leading-tight font-medium leading-tight">
              {whyCard.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

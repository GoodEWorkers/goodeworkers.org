import React from 'react';
import Alice from '../../images/alice_thumb.png';
import Richard from '../../images/richard_thumb.png';
import BigRoundedLinkBtn from '../Common/BigRoundedLinkBtn';

export default function About() {
  
  const aboutText1_1 = 'A team of ';
  const aboutText1_2 = 'expert and complementary';
  const aboutText1_3 = ' volunteers';
  const aboutText2 =
    "It's hard to be both an expert and versatile! That's why we rely on a team of volunteers with varied profiles. Freelancers or employees, technical, graphic or semantic experts, all have decided to make a gesture for";
  const aboutText3 =
    ' a fairer and more humane world by joining the Good eWorkers network.';
  const aboutText4 =
    'We form a new team for each project based on the established specifications and the availability of our volunteers.';
  const aboutText5 =
    'Are you a freelancer, employee, student, unemployed or retired, and you want to do your part for the planet?';
  const aboutText6 = 'The benefits of joining us:';
  const aboutText7 =
    'Free training to introduce you to remote work and our methods';
  const aboutText8 = 'An expert community to help you progress in your field';
  const aboutText9 = 'Projects that make sense in line with your values';
  const aboutText10 = 'A plus for your CV, Portfolio, Book';
  const aboutText11 = 'Join Us';
  const aboutText12 = '2';
  const aboutText13 = 'ongoing\nprojects';
  const aboutText14 = 'Co-founder';
  const aboutText15 = 'Executive Director';

  return (
    
    <section id="who-are-we">
    <div className="bg-black-light rounded-xl lg:rounded-2xl text-grey font-medium text-sm md:text-base pt-10 px-6 md:px-8 mb-36 sm:mb-56 lg:mb-20 xl:mb-28">
      <div className=" lg:flex lg:space-x-8 xl:space-x-16 lg:justify-between max-w-screen-2xl mx-auto">
        <div className="flex flex-col max-w-screen-md lg:pb-20 lg:mt-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-[54px] font-medium leading-[1.2] md:leading-tight lg:leading-tight">
            {aboutText1_1}
            <span className="font-bold">{aboutText1_2}</span>
            {aboutText1_3}
          </h2>
          <p className="mt-7 sm:mt-10 md:mt-14 lg:mt-10">
            {aboutText2}
            <span className="font-bold">{aboutText3}</span>
          </p>
          <p className="mt-4">{aboutText4}</p>
          <p className="mt-4">{aboutText5}</p>
          <p className="mt-8 font-bold text-purple uppercase">
            {aboutText6}
          </p>
          <p className="mt-8 underline leading-loose">{aboutText7}</p>
          <p className="mt-8 underline leading-loose">{aboutText8}</p>
          <p className="mt-8 underline leading-loose">{aboutText9}</p>
          <p className="mt-8 underline leading-loose">{aboutText10}</p>
        </div>
        <div className="">
          <BigRoundedLinkBtn
            bigBtmText={aboutText11}
            href="/#contact"
            upperSmallText=""
            className="lg:hidden bg-orange text-white mt-10 mx-auto"
          />
          <div className="relative mt-6 sm:mt-16 lg:mt-20 h-72 sm:h-80 lg:h-72 w-full flex justify-center items-center">
            <div className="w-40 sm:w-56 flex-shrink-0 translate-x-3 sm:translate-x-5 relative">
              <img
                src={Richard}
                width={240}
                height={240}
                className="rounded-xl w-full aspect-square"
              />
              <p className="text-xs sm:text-sm absolute -bottom-6 left-0">
                Richard,{' '}
                <span className="font-semibold">{aboutText14}</span>
              </p>
            </div>
            <div className="w-40 sm:w-56 flex-shrink-0 -translate-x-3 sm:-translate-x-5 translate-y-32 sm:translate-y-44 relative">
              <div className="absolute top-0 right-0 rounded-2xl bg-white w-28 sm:w-36 h-36 sm:h-48 -translate-y-[165px] sm:-translate-y-56 flex justify-center items-center flex-col">
                <p className="font-clash text-2xl sm:text-3xl font-bold text-center text-black">
                  {aboutText12}
                </p>
                <p className="text-sm sm:text-base font-medium text-center text-black">
                  {aboutText13}
                </p>
              </div>
              <img
                src={Alice}
                width={240}
                height={240}
                className="rounded-xl w-full aspect-square"
              />
              <p className="text-xs sm:text-sm -bottom-6 absolute left-0">
                Alice,{' '}
                <span className="font-semibold">{aboutText15}</span>
              </p>
            </div>
          </div>
          <div className="hidden lg:block xl:relative xl:-left-56 xl:-top-40">
            <BigRoundedLinkBtn
              bigBtmText={aboutText11}
              href="/#contact"
              upperSmallText=""
              className="bg-orange text-white mt-56 mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

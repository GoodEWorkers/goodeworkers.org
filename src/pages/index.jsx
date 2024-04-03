import React from 'react';
// import '../styles/index.scss';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Favicon from '../images/favicon.png';
import Map from '../assets/icons/map.svg';
import Dollar from '../assets/icons/dollar.svg';
import Calendar from '../assets/icons/calendar.svg';
import Gatsby from '../assets/icons/gatsby.svg';
import Lili from '../assets/icons/lili.svg';
import Webnet from '../assets/icons/webnet.svg';
import Chat from '../assets/icons/chat.svg';
import Magnify from '../assets/icons/magnify.svg';
import Hexagone from '../assets/icons/hexagone.svg';
import Heart from '../assets/icons/heart.svg';
import Encircled from '../components/Miscs/Encircled';

function IndexPage() {
  const heroCards = [
    {
      icon: <Webnet className="w-5 h-5" />,
      title: 'Website\ncreation',
    },
    {
      icon: <Chat className="w-5 h-5" />,
      title: 'Content\nmarketing',
    },
    {
      icon: <Magnify className="w-5 h-5" />,
      title: 'SEO\nOptimization',
    },
    {
      icon: <Hexagone className="w-5 h-5" />,
      title: 'Audits\nand advice',
    },
    {
      icon: <Heart className="w-4 h-4" />,
      title: 'And much\nmore...',
    },
  ];

  const heroContent = `We provide a variety of services, including
  website development, content marketing, and social media management.
  We also offer a free consultation to help you understand your
  needs and how we can help you achieve your goals.`;

  const whyCardsData = [
    {
      icon: <Map className="w-6 h-6" />,
      classNames: 'bg-yellow text-black-light',
      title: 'No geographical \nrestrictions',
      text: 'We are not a local association, we welcome all volunteers from around the globe.',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      classNames: 'bg-orange text-white',
      title: 'A streamlined \norganization',
      text: 'We excel in the art of remote work, working asynchronously, with all tasks predefined to enhance efficiency for all stakeholders.',
    },
    {
      icon: <Dollar className="w-6 h-6" />,
      classNames: 'bg-purple text-black-light',
      title: 'Reduced \ncost',
      text: 'With no physical premises or offices, our infrastructure costs are significantly minimized, benefiting everyone.',
    },
  ];

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
    {
      id: 3,
      icon: <Gatsby />,
      classNames: '',
      name: 'Gatsby',
    },
    {
      id: 4,
      icon: <Lili />,
      classNames: '',
      name: 'Lili Schmitt',
    },
    {
      id: 5,
      icon: <Gatsby />,
      classNames: '',
      name: 'Gatsby',
    },
    {
      id: 6,
      icon: <Lili />,
      classNames: '',
      name: 'Lili Schmitt',
    },
    {
      id: 7,
      icon: <Gatsby />,
      classNames: '',
      name: 'Gatsby',
    },
    {
      id: 8,
      icon: <Lili />,
      classNames: '',
      name: 'Lili Schmitt',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="font-inter px-4 md:px-8">
        <header className="pt-8 md:pt-12 lg:pt-24 text-grey">
          <h1 className="text-4xl md:text-5xl lg:text-7xl text-center">
            <span className="text-yellow font-clash font-medium">Good</span>
            <span className="text-orange font-clash font-semibold">e</span>
            <span className="text-purple font-clash font-medium">Workers</span>
            <br />
            <span className="inline-block mt-4 md:mt-8 lg:mt-12 font-medium">Helping</span>
            {' '}
            <Encircled text="nonprofits" className="font-bold" />
            {' '}
            <span className="font-medium">go&nbsp;remote</span>
          </h1>
          <p className="mt-8 md:mt-12 lg:mt-16 px-4 sm:px-16 max-w-screen-md mx-auto text-sm md:text-base text-center leading-snug md:leading-tight">
            As a nonprofit we believe that everyone has the power to make a
            difference in the world,
            and we want to make it easier for people to do that from the comfort
            of their own homes.
          </p>
          <p className="mt-4 px-4 sm:px-16 max-w-screen-md mx-auto text-sm md:text-base font-bold text-center leading-snug md:leading-tight">
            If you&apos;re a nonprofit, we can help you with web development,
            content marketing, design, or animation.
          </p>
        </header>
        <main>
          {/* Hero Section */}
          <section id="hero">
            <div className="flex flex-col mx-4 sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 mt-12 sm:mt-20 sm:justify-center sm:space-x-6 md:space-x-12 relative z-10">
              <Link to="/#contact" className="w-full max-w-[336px] bg-yellow px-8 py-4 rounded-full flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform ease-in">
                <span className="text-sm sm:text-base font-medium">I am a</span>
                <span className="text-3xl sm:text-4xl font-clash font-bold text-center">nonprofit</span>
              </Link>
              <Link to="/#contact" className="w-full max-w-[336px] bg-purple px-8 py-4 rounded-full flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform ease-in">
                <span className="text-sm sm:text-base font-medium">I want to</span>
                <span className="text-3xl sm:text-4xl font-clash font-bold text-center">help</span>
              </Link>
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
                      {' '}
                      can help you
                      {' '}
                      <span className="font-bold">go digital</span>
                    </span>
                  </h2>
                  <p className="mt-10 font-bold leading-tight">
                    {heroContent}
                  </p>
                </div>
                <div className="mt-10 lg:mt-0 grid grid-cols-2 sm:flex sm:flex-wrap w-full max-w-80 sm:max-w-xl sm:justify-center mx-auto gap-1.5 md:gap-3 xl:gap-5 lg:flex-1">
                  {heroCards.map((card, index) => (
                    <div
                      key={card.title}
                      title={card.title}
                      className={`hover:opacity-85 aspect-square flex flex-col items-center justify-center rounded-lg sm:w-36 md:w-40 ${index === heroCards.length - 1 ? 'bg-orange text-white' : 'bg-grey'}`}
                    >
                      {card.icon}
                      <p className="mt-4 text-sm md:text-base font-bold whitespace-pre-line text-center">{card.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* Why Section */}
          <section id="why" className="pb-12 md:pb-16 xl:pb-24">
            <div className="mt-10 sm:mt-16 md:mt-32 text-white text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-[54px] text-grey font-medium leading-[1.2] md:leading-tight lg:leading-tight">
                Making distance an
                {' '}
                <br className="min-[1200px]:hidden" />
                <span className="inline-block relative">
                  <Encircled text="advantage" className="font-bold" />
                  <span className="block absolute top-[5px] sm:top-[10px] md:top-[15px] lg:top-[-5px] xl:top-[5px] right-[-85px] sm:right-[-105px] md:right-[-130px] lg:right-[-200px] w-[120px] sm:w-[142px] md:w-[175px] lg:w-[250px] h-[72px] sm:h-[85px] md:h-[105px] lg:h-[150px] bg-[url('../images/why_arrow.svg')] bg-no-repeat bg-center bg-contain" />
                </span>
              </h2>
              <p className="mt-8 sm:mt-12 md:mt-12 lg:mt-12 px-8 sm:px-12 max-w-md sm:max-w-screen-md mx-auto text-sm md:text-base text-ashgray leading-tight md:leading-tight">
                <span className="font-bold">
                  Throughout the duration of your project, you will have a dedicated
                  interlocutor
                </span>
                <span className="font-medium">
                  {' '}
                  with whom you will regularly communicate via phone, email, video
                  conferencing, or chat.
                  {' '}
                </span>
                <br className="hidden lg:block" />
                This way, you will be kept informed of progress
                and any potential setbacks.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-1.5 sm:gap-3 md:gap-5 px-2 sm:px-4">
              {whyCardsData.map((whyCard) => (
                <div key={whyCard.title} className={`aspect-square  min-[580px]:basis-60 md:basis-80 flex-grow max-w-80 min-[580px]:max-w-[48%] md:max-w-[360px] flex flex-col items-center justify-center text-center px-8 min-[580px]:px-4 sm:px-8 rounded-lg ${whyCard.classNames}`}>
                  {whyCard.icon}
                  <p className="mt-4 whitespace-pre-line font-bold leading-tight">{whyCard.title}</p>
                  <p className="mt-4 text-sm md:text-base md:leading-tight font-medium leading-tight">{whyCard.text}</p>
                </div>
              ))}
            </div>
          </section>
          {/* Partners Section */}
          <section id="partners">
            <div className="mt-10 text-white pb-20 xl:pb-32">
              <h2 className="font-medium text-3xl sm:text-4xl md:text-5xl xl:text-[54px] text-center">
                With the help of our
                {' '}
                <br className="xl:hidden" />
                <Encircled text="partners" className="font-bold" />
              </h2>
              <div className="partnersCards md:hidden mt-12 w-full text-sm overflow-hidden">
                <div className="slider flex xl:pt-24 xl:pb-32 w-fit">
                  {partnersIcons.map((partner) => (
                    <div key={`${partner.name}-${partner.id}`} className="w-40 mr-5 las">
                      <div className="w-40 h-40 bg-black-light rounded-xl flex flex-col justify-center items-center text-grey">{partner.icon}</div>
                      <p className="mt-4 text-center font-bold">{partner.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block md:mt-20 xl:mt-24 w-full overflow-hidden">
                <div className="slider flex w-fit mx-auto">
                  {partnersIcons.slice(0, 4).map((partner) => (
                    <div key={`${partner.name}-${partner.id}`} className="w-40 mr-5 las">
                      <div className="w-40 h-40 bg-black-light rounded-xl flex flex-col justify-center items-center text-grey">{partner.icon}</div>
                      <p className="mt-4 text-center font-bold">{partner.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default IndexPage;

export function Head() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteMetaDescription
        }
      }
    }
  `);
  return (
    <>
      <title>
        {data.site.siteMetadata.title}
      </title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta
        name="description"
        content={data.site.siteMetadata.siteMetaDescription}
      />
      <meta name="keywords" content="remote work, nonprofits, mentor, social enterprise" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href={Favicon} />
    </>
  );
}
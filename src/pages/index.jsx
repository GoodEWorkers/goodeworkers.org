import React from 'react';
// import '../styles/index.scss';
import { graphql, useStaticQuery } from 'gatsby';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Favicon from '../images/favicon.png';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import Map from '../assets/icons/map.svg';
import Dollar from '../assets/icons/dollar.svg';
import Calendar from '../assets/icons/calendar.svg';

function IndexPage() {
  const cardsData = [
    {
      icon: 'Webnet',
      title: 'Website creation',
    },
    {
      icon: 'Chat',
      title: 'Content marketing',
    },
    {
      icon: 'Magnify',
      title: 'SEO Optimization',
    },
    {
      icon: 'Hexagone',
      title: 'Audits and advice',
    },
    {
      icon: 'Heart',
      title: 'And more...',
      className: 'pumpkin',
    },
  ];

  const heroButtons = [
    {
      text: 'I am a',
      largerText: 'nonprofit',
      className: 'biggerButton amber-ink',
    },
    {
      text: 'I want to',
      largerText: 'help',
      className: 'biggerButton lilac-ink',
    },
  ];

  const whyCardsData = [
    {
      icon: <Map height="24px" />,
      classNames: 'bg-amber color-coal',
      title: 'No geographical \nrestrictions',
      text: 'We are not a local association, we welcome all volunteers from around the globe.',
    },
    {
      icon: <Calendar height="24px" />,
      classNames: 'bg-pumpkin color-snow',
      title: 'A streamlined \norganization',
      text: 'We excel in the art of remote work, working asynchronously, with all tasks predefined to enhance efficiency for all stakeholders.',
    },
    {
      icon: <Dollar height="24px" />,
      classNames: 'bg-lilac color-coal',
      title: 'Reduced \ncost',
      text: 'With no physical premises or offices, our infrastructure costs are significantly minimized, benefiting everyone.',
    },
  ];

  return (
    <div className="homeContainer">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header>
        <h1>
          <strong>
            <span className="color-amber">Good</span>
            <span className="color-pumpkin cash-semi-bold">e</span>
            <span className="color-lilac">Workers</span>
          </strong>
          {' '}
          <span>Helping</span>
          {' '}
          <span className="encircled">nonprofits</span>
          {' '}
          <span>go&nbsp;remote</span>
        </h1>
        <p>
          As a non-profit we believe that everyone has the power to make a
          difference in the world,
          and we want to make it easier for people to do that from the comfort
          of their own homes.
        </p>
        <p>
          <strong>
            If you&apos;re a nonprofit, we can help you with web development,
            content marketing, design, or animation.
          </strong>
        </p>
      </header>

      {/* Main */}
      <main>

        {/* Hero Section */}
        <section id="hero">
          <div className="heroContent">
            <h2>
              Good
              <span>e</span>
              Workers
              can help you
              {' '}
              <b>go digital</b>

            </h2>
            <p>

              <span>
                We provide a variety of services, including website development, content marketing,
                and social media management.
                We also offer a free consultation to help you understand your
                needs and how we can help you achieve your goals.
              </span>
            </p>
          </div>
          <div className="heroCards">
            {cardsData.map((card) => (
              <Card
                key={card.title}
                icon={card.icon}
                title={card.title}
                className={`minicard ${card.className}`}
              />
            ))}
          </div>
          <div className="heroButtons">
            {heroButtons.map((button) => (
              <Button
                key={button.text}
                text={button.text}
                largerText={button.largerText}
                className={button.className}
                href="#contact"
              />
            ))}
          </div>
        </section>

        {/* Why Section */}
        <section id="why">
          <div className="whyContent">
            <h2 className="">
              Making distance an
              {' '}
              <br />
              <span className="encircled">advantage</span>
            </h2>
            <p className="">
              <b>
                Throughout the duration of your project, you will have a dedicated
                interlocutor
              </b>
              {' '}
              with whom you will regularly communicate via phone, email, video
              conferencing, or chat.
              {' '}
              <br />
              This way, you will be kept informed of progress
              and any potential setbacks.
            </p>
          </div>
          <div className="whyCards">
            {whyCardsData.map((whyCard) => (
              <div key={whyCard.title} className={`whyCard ${whyCard.classNames}`}>
                {whyCard.icon}
                <p className="title">{whyCard.title}</p>
                <p className="text">{whyCard.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
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
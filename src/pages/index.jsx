import React from 'react';
import '../styles/index.scss';
import { graphql, navigate, useStaticQuery } from 'gatsby';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Favicon from '../images/favicon.png';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';

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
      onClick: navigate('#contact'),
      className: 'biggerButton amber-ink',
    },
    {
      text: 'I want to',
      largerText: 'help',
      onClick: navigate('#contact'),
      className: 'biggerButton lilac-ink',
    },
  ];

  return (
    <div className="homeContainer">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header>
        <h1>

          <span>Good</span>
          <span>e</span>
          <span>Workers</span>
          <br />
          Helping
          {' '}
          <span>nonprofits</span>
          {' '}
          go remote
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
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
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
import React from 'react';
import '../styles/index.scss';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Favicon from '../images/favicon.png';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';

function IndexPage() {
  const cardsData = [
    {
      icon: 'Webnet',
      title: 'Création de site internet',
    },
    {
      icon: 'Chat',
      title: 'Rédaction de contenu',
    },
    {
      icon: 'Magnify',
      title: 'Optimisation SEO',
    },
    {
      icon: 'Hexagone',
      title: 'Audit et recommandations',
    },
    {
      icon: 'Heart',
      title: 'Et bien plus...',
      className: 'pumpkin',
    },
  ];

  const heroButtons = [
    {
      text: 'Je suis une',
      largerText: 'entreprise',
      onClick: '/',
      className: 'biggerButton amber-ink',
    },
    {
      text: 'Je suis une',
      largerText: 'association',
      onClick: '/',
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
          Bievenue chez
          <span> Good</span>
          <span> e</span>
          <span>Workers </span>
          le réseau qui aide les
          &nbsp;
          <span>associations</span>
        </h1>
        <p>
          Vous êtes président ou chargé de développement d’une association
          et vous ne savez pas comment structurer votre présence en ligne ?
          <br />
          <span>Good eWorkers </span>
          vous aide à développer votre visibilité sur internet.
        </p>
      </header>

      {/* Main */}
      <main>

        {/* Hero Section */}
        <section id="hero">
          <div className="heroContent">
            <h2>
              Good
              <span> e</span>
              Workers
              <span>, </span>
              l’association au service de la
              <span> visibilité numérique des associations</span>
            </h2>
            <p>
              Good eWorkers est une association loi 1901 dont les membres se mettent au service
              d’autres associations.
              <span>
                &nbsp;Le but : vous aider à être &#40;mieux&#41; visible sur
                internet et vous fournir l’ensemble des outils digitaux dont vous avez besoin à un
                prix réduit au strict minimum.
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
                onClick={button.onClick}
              />
            ))}
          </div>
        </section>

        {/* Advantages Section */}
        <section id="advantages">
          advantages
        </section>

        {/* Team Section */}
        <section id="team">
          team
        </section>

        {/* Partners Section */}
        <section id="partners">
          partners
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default IndexPage;

export function Head() {
  return (
    <>
      <html lang="fr" />
      <title>
        GoodEWorkers - L’association au service de la visibilité numérique des associations
      </title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
      />
      <meta
        name="description"
        content="Good eWorkers est une association loi 1901 dont les membres se mettent au service d’autres associations.
                Le but : vous aider à être (mieux) visible sur internet, et vous fournir l’ensemble des outils digitaux
                dont vous avez besoin à un prix réduit au strict minimum."
      />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href={Favicon} />
    </>
  );
}
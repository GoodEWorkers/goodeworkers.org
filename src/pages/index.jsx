import React from 'react';
import '../styles/index.scss';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Favicon from '../images/favicon.png';

function IndexPage() {
  return (
    <main className="index">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header>
        <h1>
          Bievenue chez
          &nbsp;
          <span>Good</span>
          &nbsp;
          <span>e</span>
          <span>Workers</span>
          &nbsp;
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

      {/* Footer */}
      <Footer />
    </main>
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
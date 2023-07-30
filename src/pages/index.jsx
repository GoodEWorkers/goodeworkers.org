import React from 'react';
import '../styles/index.scss';
import Header from '../components/Header/Header';
import Favicon from '../images/favicon.png';

function IndexPage() {
  return (
    <main className="index">
      <Header />
      <section>
        <div>
          <h1>
            Welcome to GoodeWorkers
          </h1>
          <p>
            We are still working on this page...
          </p>
          <br />
          <p>
            <a href="mailto:goodeworkers@proton.me">e-mail</a>
          </p>
        </div>
      </section>
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
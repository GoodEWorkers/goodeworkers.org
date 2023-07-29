import React from 'react';
import '../styles/index.scss';
// import Favicon from '../images/favicon.png';

function IndexPage() {
  return (
    <main className="index">
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
      <title>GoodEWorkers</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
      />
      {/* <link rel="icon" href={Favicon} /> */}
    </>
  );
}
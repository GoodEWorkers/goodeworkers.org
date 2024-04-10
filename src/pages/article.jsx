import React from 'react';

// import { graphql, useStaticQuery } from 'gatsby';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
// import Favicon from '../images/favicon.png';

function ArticlePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="text-white">Test</section>
      </main>
      <Footer />
    </>
  );
}

export default ArticlePage;

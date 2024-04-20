import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Footer from '../components/Footer';
import About from '../components/Landing/About';
import Hero from '../components/Landing/Hero';
import LandingHeader from '../components/Landing/LandingHeader';
import Partners from '../components/Landing/Partners';
import Why from '../components/Landing/Why';
import Navbar from '../components/Navbar';
import Favicon from '../images/favicon.png';

function IndexPage() {

  return (
    <>
      <Navbar />
      <div className="font-inter px-4 md:px-8">
        <LandingHeader />
        <main>
          {/* Hero Section */}
          <Hero />
          {/* Why Section */}
          <Why />
          {/* About Us/Team Section */}
          <About />
          {/* Partners Section */}
          <Partners />
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
      <title>{data.site.siteMetadata.title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta
        name="description"
        content={data.site.siteMetadata.siteMetaDescription}
      />
      <meta
        name="keywords"
        content="remote work, nonprofits, mentor, social enterprise"
      />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href={Favicon} />
    </>
  );
}

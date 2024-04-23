import * as React from 'react';
import { graphql } from 'gatsby';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export { Head } from './index';

type DataType = {
  markdownRemark: {
    html: string;
    frontmatter: {
      date: string;
      slug: string;
      title: string;
    };
  };
};

export default function Legals({ data }: { data: DataType }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <Navbar />
      <div className="font-inter text-white bg-black-light mx-8 my-10 rounded-3xl">
        <main className="max-w-screen-2xl mx-auto min-h-screen px-4 py-8">
          <div className="max-w-screen-md mx-auto">
            <h2 className="mt-14 text-3xl sm:text-4xl lg:text-5xl xl:text-[54px]">
              {frontmatter.title}
            </h2>
            <div className="mt-10" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;

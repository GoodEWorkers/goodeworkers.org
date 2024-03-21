import '../styles/legals.scss';
import * as React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export { Head } from './index';

export default function Legals({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <Navbar />
      <div className="container">
        <main>
          <div className="inner-container">
            <h1>{frontmatter.title}</h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

Legals.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string,
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        slug: PropTypes.string,
        title: PropTypes.string,
      }),
    }),
  }),
};

Legals.defaultProps = {
  data: {
    markdownRemark: {
      html: '',
      frontmatter: {
        date: '',
        slug: '',
        title: '',
      },
    },
  },
};

export const pageQuery = graphql`
  query($id: String!) {
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
import React from 'react';
import PropTypes from 'prop-types';

export default function Encircled({ text, className }) {
  return (
    <span className="relative">
      <span className={`z-10 relative px-1.5 ${className}`}>{text}</span>
      <span className="absolute inset-x-0 top-[25%] rounded-full z-0 border-orange border md:border-2 h-[62%]" />
    </span>
  );
}

Encircled.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Encircled.defaultProps = {
  className: '',
};

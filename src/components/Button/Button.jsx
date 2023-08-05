import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

export default function Button(props) {
  const {
    className,
    href,
    target,
    text,
    largerText,
  } = props;

  return (
    <a
      type="button"
      className={`button ${className}`}
      href={href}
      target={target}
    >
      {text}
      {largerText ? (<span>{largerText}</span>) : ''}
    </a>

  );
}

Button.defaultProps = {
  className: null,
  href: null,
  target: null,
  largerText: null,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  largerText: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
};
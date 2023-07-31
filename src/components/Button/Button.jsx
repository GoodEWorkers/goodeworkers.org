import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

export default function Button(props) {
  const {
    className,
    href,
    onClick,
    target,
    text,
    largerText,
  } = props;

  return href ? (
    <a
      type="button"
      className={`button ${className}`}
      onClick={onClick}
      href={href}
      target={target}
    >
      <span>{text}</span>
    </a>
  ) : (
    <button
      type="submit"
      className={`button ${className}`}
      onClick={onClick}
    >
      {text}
      <span>{largerText}</span>
    </button>
  );
}

Button.defaultProps = {
  className: null,
  href: null,
  onClick: null,
  target: null,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  largerText: PropTypes.string.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  target: PropTypes.string,
};
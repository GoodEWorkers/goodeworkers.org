import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

export default function Button(props) {
  const {
    className,
    href,
    onClick,
    target,
    icon,
    text,
  } = props;

  if (href) {
    return (
      <a
        type="button"
        className={`button ${className}`}
        onClick={onClick}
        href={href}
        target={target}
      >
        {icon}
        <span>{text}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`button ${className}`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

Button.defaultProps = {
  icon: null,
  className: null,
  href: null,
  onClick: null,
  target: null,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  target: PropTypes.string,
};
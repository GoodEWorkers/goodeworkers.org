import React from 'react';
import './Card.scss';
// import '../../styles/global.scss';
import PropTypes from 'prop-types';
import Webnet from '../../assets/icons/webnet.svg';
import Chat from '../../assets/icons/chat.svg';
import Heart from '../../assets/icons/heart.svg';
import Hexagone from '../../assets/icons/hexagone.svg';
import Magnify from '../../assets/icons/magnify.svg';

export default function Card(props) {
  const {
    className,
    icon,
    title,
    text,
  } = props;

  function getIcon(svgIcon) {
    const icons = {
      Webnet: <Webnet height="18px" />,
      Chat: <Chat height="18px" />,
      Magnify: <Magnify height="18px" />,
      Hexagone: <Hexagone height="18px" />,
      Heart: <Heart height="18px" />,
    };
    return icons[svgIcon] || null;
  }

  return (
    <div className={`card ${className}`}>
      {getIcon(icon)}
      <p>{title}</p>
      {text && text}
    </div>
  );
}

Card.defaultProps = {
  className: null,
  icon: null,
  title: null,
  text: null,
};

Card.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};
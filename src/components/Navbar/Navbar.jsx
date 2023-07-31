import React from 'react';
import './Navbar.scss';
import Logo from '../../images/logo.png';
import Button from '../Button/Button';

export default function Navbar() {
  const navigationButtons = [
    {
      text: 'Le projet',
      href: '/',
      target: '_blank',
      className: 'navButton',
    },
    {
      text: 'Qui sommes-nous?',
      href: '/',
      target: '_blank',
      className: 'navButton',
    },
    {
      text: 'FAQ',
      href: '/',
      target: '_blank',
      className: 'navButton',
    },
    {
      text: 'Contact',
      href: '/',
      target: '_blank',
      className: 'navButton actived',
    },
  ];
  return (
    <div id="navbarContainer">
      <a href="/">
        <img src={Logo} alt="Good eWorkers logo" />
      </a>
      <input type="checkbox" id="menuToggle" />
      <label htmlFor="menuToggle" className="burgerMenu">
        <span>{}</span>
      </label>
      <nav>
        {navigationButtons.map((button) => (
          <Button
            key={button.text}
            text={button.text}
            href={button.href}
            target={button.target}
            className={button.className}
          />
        ))}
      </nav>
    </div>
  );
}
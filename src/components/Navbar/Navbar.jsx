import React from 'react';
import './Navbar.scss';
import Logo from '../../images/logo.png';

export default function Navbar() {
  const navigationLinks = [
    {
      text: 'Contact',
      className: 'navButton',
      goto: '/#contact',
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
        {navigationLinks.map((link) => (
          <a
            key={link.goto}
            className={link.className}
            href={link.goto}
          >
            {link.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
import React from 'react';
import './Header.scss';
import Logo from '../../images/logo.png';
import Button from '../Button/Button';

export default function Header() {
  const navigationButtons = [
    { text: 'Le projet', href: '/' },
    { text: 'Qui sommes-nous?', href: '/' },
    { text: 'FAQ', href: '/' },
    { text: 'Contact', className: 'actived', href: '/' },
  ];
  return (
    <header>
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
            className={button.className}
          />
        ))}
      </nav>
    </header>
  );
}
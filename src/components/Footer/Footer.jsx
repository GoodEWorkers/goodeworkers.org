import React from 'react';
import './Footer.scss';
import ContactForm from '../ContactForm/ContactForm';

export default function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <div className="formContainer">
          <p>Contactez-nous !</p>
          <p>
            hello
            <span className="toWrap">@goodeworkers</span>
            <span className="toWrap">.com</span>
          </p>
        </div>
        <ContactForm />
        <ul>
          <li><a href="#mentions-legales">Mentions légales</a></li>
          <li><a href="#condition-generales">Condition générales</a></li>
          <li><a href="#rdgb">RDGB</a></li>
        </ul>
      </div>
    </footer>
  );
}
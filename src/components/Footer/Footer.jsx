import React from 'react';
import './Footer.scss';
import ContactForm from '../ContactForm/ContactForm';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footerContainer">
        <div className="formContainer">
          <p>Contact-us !</p>
          <p>
            <span>hello</span>
            <span>@goodeworkers.org</span>
          </p>
          <ContactForm />
        </div>
        <ul className="footerEnd">
          <li className="copy">GoodEWorkers © 2023</li>
          <li><a href="/legals">Legal Disclaimers</a></li>
        </ul>
      </div>
    </footer>
  );
}
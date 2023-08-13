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
        <ul>
          <li>GoodEWorkers © 2023</li>
        </ul>
      </div>
    </footer>
  );
}
import React from 'react';
// import './Footer.scss';
import ContactForm from '../ContactForm/ContactForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative z-10 bg-white text-black font-inter">
      <div className="absolute -z-50 bg-transparent w-px h-px transform -translate-y-12" id="contact" />
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mb-4 pt-12 pb-10">
        <div className="flex flex-col">
          <p className="text-xs font-bold">Contact-us !</p>
          <div className="mt-4">
            <a href="mailto:hello@goodeworkers.org" className="text-3xl font-bold">
              hello
              <br className="" />
              @goodeworkers.org
            </a>
          </div>
          <ContactForm />
        </div>
        <ul className="mt-24 md:mt-40 xl:mt-60 flex flex-col items-center text-sm">
          <li>
            GoodEWorkers ©
            {' '}
            {currentYear}
          </li>
        </ul>
      </div>
    </footer>
  );
}
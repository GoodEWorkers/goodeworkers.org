import React from 'react';
import ContactForm from './ContactForm';
import { Link } from 'gatsby';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const goodEWorkersEmail = 'hello@goodeworkers.org';
  const goodEWorkersText1 = 'hello';
  const goodEWorkersText2 = '@goodeworkers.org';
  const goodEWorkersText3 = `GoodEWorkers © ${currentYear}`;
  const goodEWorkersText4 = 'Legal Disclaimers';

  return (
    <footer className="relative z-10 bg-white text-black font-inter">
      <div
        className="absolute -z-50 bg-transparent w-px h-px transform -translate-y-12"
        id="contact"
      />
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mb-4 pt-12 pb-10">
        <div className="flex flex-col">
          <p className="text-xs font-bold">Contact-us !</p>
          <div className="mt-4">
            <a
              href={`mailto:${goodEWorkersEmail}`}
              className="text-3xl font-bold"
            >
              {goodEWorkersText1}
              <br className="" />
              {goodEWorkersText2}
            </a>
          </div>
          <ContactForm />
        </div>
        <ul className="mt-24 md:mt-40 xl:mt-60 flex flex-col items-center text-sm space-y-2">
          <li className='hover:underline'>
            <Link to="/legals">{goodEWorkersText4}</Link>
          </li>
          <li>{goodEWorkersText3}</li>
        </ul>
      </div>
    </footer>
  );
}

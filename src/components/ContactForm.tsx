import React from 'react';

export default function ContactForm() {
  const formText1 = 'Your name';
  const formText2 = 'Your email address';
  const formText3 = 'Your message';
  const formText4 = 'Send';

  return (
    <form
      className="flex flex-col md:flex-row md:space-x-20"
      name="contact"
      method="POST"
      data-netlify="true"
    >
      <div className="flex flex-col md:flex-1">
        <input type="hidden" name="form-name" value="contact" />
        <div className="relative mt-14">
          <input
            className="peer w-full bg-white border-x-0 border-t-0 border-b-2 border-black px-0 pt-0 pb-1 h-10 text-base focus:ring-0 focus:border-black placeholder-transparent"
            type="text"
            name="name"
            id="name"
            placeholder={formText1}
            required
          />
          <label
            htmlFor="name"
            className="absolute left-0 -top-5 text-gray-600 text-sm cursor-text transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          >
            {formText1}
          </label>
        </div>
        <div className="relative mt-16">
          <input
            className="peer w-full bg-white border-x-0 border-t-0 border-b-2 border-black px-0 pt-0 pb-1 h-10 text-base focus:ring-0 focus:border-black placeholder-transparent"
            type="email"
            name="email"
            id="email"
            placeholder={formText2}
            required
          />
          <label
            htmlFor="email"
            className="absolute left-0 -top-5 text-gray-600 text-sm cursor-text transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
          >
            {formText2}
          </label>
        </div>
        <div className="relative mt-16">
          <textarea
            className="pt-4 pb-2 peer w-full bg-white border-x-0 h-40 focus:h-40 placeholder-shown:h-14 border-t-0 border-b-2 border-black px-0 py-0 text-base focus:ring-0 focus:border-black placeholder-transparent"
            name="message"
            id="message"
            placeholder={formText3}
            required
          />
          <label
            htmlFor="message"
            className="absolute left-0 -top-4 text-gray-600 text-sm cursor-text transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-5 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
          >
            {formText3}
          </label>
        </div>
      </div>
      <div className="mt-16 md:mt-0 flex md:flex-1 justify-center md:justify-start md:items-end">
        <label
          htmlFor="submit"
          className="cursor-pointer w-full max-w-[336px] bg-orange px-7 py-5 rounded-full flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform ease-in"
        >
          <input type="submit" id="submit" value="send" className="hidden" />
          <span className="text-3xl sm:text-4xl font-clash font-bold text-center">
            {formText4}
          </span>
        </label>
      </div>
    </form>
  );
}

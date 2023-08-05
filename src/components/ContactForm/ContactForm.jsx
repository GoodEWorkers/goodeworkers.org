import './ContactForm.scss';
import React from 'react';

export default function ContactForm() {
  return (
    <form name="contact" method="POST" data-netlify="true">
      <div className="formInputs">
        <input type="hidden" name="form-name" value="contact" />

        <input
          type="text"
          name="name"
          placeholder="Votre nom"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Votre adresse mail"
          required
        />
        <textarea
          name="message"
          placeholder="Votre message"
          required
        />
      </div>
      <div className="biggerButtons">
        <input
          type="submit"
          value="send"
        />
      </div>
    </form>
  );
}
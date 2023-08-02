import React, { useState } from 'react';
import './ContactForm.scss';
import Button from '../Button/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [clickedButton, setClickedButton] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...formData,
      clickedButton,
    };
    console.log('Data: ', data);
  }

  function handleButtonClick(buttonName) {
    setClickedButton(buttonName);
  }

  const biggerButtons = [
    {
      text: 'Message à',
      largerText: 'envoyer',
      onClick: () => handleButtonClick('Message à envoyer'),
      className: 'biggerButton amber-coal',
    },
    {
      text: 'Nous',
      largerText: 'rejoindre',
      onClick: () => handleButtonClick('Nous rejoindre'),
      className: 'biggerButton pumpkin-white',
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInputs">
        <input
          type="text"
          name="name"
          placeholder="Votre nom"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Votre adresse mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className="biggerButtons">
        {biggerButtons.map((button) => (
          <Button
            key={button.largerText}
            text={button.text}
            largerText={button.largerText}
            className={button.className}
            onClick={button.onClick}
          />
        ))}
      </div>
    </form>
  );
}
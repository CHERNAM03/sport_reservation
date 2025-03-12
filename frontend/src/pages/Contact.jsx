import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contactez-nous</h2>
      <form className="contact-form">
        <label htmlFor="nom">Nom :</label>
        <input type="text" id="nom" name="nom" />

        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="message">Message :</label>
        <textarea id="message" name="message"></textarea>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Contact;
import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Contactez-nous</h1>
        <form className="contact-form">
          <label htmlFor="name">Nom :</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="message">Message :</label>
          <textarea id="message" name="message" rows="5"></textarea>

          <button type="submit">Envoyer</button>
        </form>
        <div className="contact-info">
          <p>Vous pouvez également nous contacter à :</p>
          <p>Email : <a href="mailto:contact@monterrain.com">contact@monterrain.com</a></p>
          <p>Téléphone : <a href="tel:+1234567890">+123 456 7890</a></p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
// filepath: /Users/cheikhthiam/Desktop/Greeta/node/projPersonnelle/Ameer/sport_reservation/frontend/src/pages/Inscription.jsx
import React from 'react';
import './Inscription.css';

function Inscription() {
  return (
    <div className="inscription-container">
      <h2>Créer un compte</h2>
      <form className="inscription-form">
        <label htmlFor="username">Nom d'utilisateur :</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="motdepasse">Mot de passe :</label>
        <input type="password" id="motdepasse" name="motdepasse" />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
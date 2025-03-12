import React from 'react';
import './Connexion.css';

function Connexion() {
  return (
    <div className="connexion-container">
      <h2>Connexion</h2>
      <form className="connexion-form">
        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="motdepasse">Mot de passe :</label>
        <input type="password" id="motdepasse" name="motdepasse" />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Connexion;
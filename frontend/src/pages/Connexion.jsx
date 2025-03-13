// filepath: /Users/cheikhthiam/Desktop/Greeta/node/projPersonnelle/Ameer/sport_reservation/frontend/src/pages/Connexion.jsx
import React from 'react';
import { Link } from 'react-router-dom';
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
      <p className="inscription-link">
        Pas de compte ? <Link to="/inscription">Créer un compte</Link>
      </p>
    </div>
  );
}

export default Connexion;
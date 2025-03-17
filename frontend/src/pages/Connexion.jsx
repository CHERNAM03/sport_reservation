
import { Link } from 'react-router-dom';
import './Connexion.css';
import React, { useState } from 'react';
import axios from 'axios';

function Connexion() {
  

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    motdepasse: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:5000/api/auth/login/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Data submitted successfully:', response.data);
      // Handle success (e.g., show a success message, redirect to another page, etc.)
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error (e.g., show an error message)
    }
  };


  return (
    <div className="connexion-container">
      <h2>Connexion</h2>
      <form className="connexion-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

<label htmlFor="motdepasse">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.motdepasse}
          onChange={handleChange}
        />
        <button type="submit">Se connecter</button>
      </form>
      <p className="inscription-link">
        Pas de compte ? <Link to="/inscription">Créer un compte</Link>
      </p>
    </div>
  );
}

export default Connexion;
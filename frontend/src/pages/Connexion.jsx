
import { Link, useNavigate } from 'react-router-dom';
import './Connexion.css';
import React, { useState } from 'react';
import axios from 'axios';

function Connexion() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      
      const { token, role } = response.data;

    // Stocker le token et le rôle dans le localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

      // Si la connexion est réussie, rediriger vers la page d'accueil
      navigate('/');
      
      // Optionnel : stocker le token dans localStorage si votre API en renvoie un
      // if (response.data.token) {
      //   localStorage.setItem('token', response.data.token);
      // }
    } catch (error) {
      console.error('Error submitting data:', error);
      // Ici vous pouvez gérer les erreurs, par exemple afficher un message
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

        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
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
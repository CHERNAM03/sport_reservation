import React, { useState } from 'react';
import axios from 'axios';
import './Inscription.css';

function Inscription() {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post('http://localhost:5000/api/auth/signup/', formData, {
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
    <div className="inscription-container">
      <h2>Créer un compte</h2>
      <form className="inscription-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Nom d'utilisateur :</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

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
          id="motdepasse"
          name="motdepasse"
          value={formData.motdepasse}
          onChange={handleChange}
        />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
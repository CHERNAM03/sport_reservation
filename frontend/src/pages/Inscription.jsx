import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Inscription.css';


function Inscription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''  
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // This prevents the default form submission
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      console.log('Form data:', formData);
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup', 
        formData,
        config
      );
      
      console.log('Registration successful:', response.data);
      setSuccess('Registration successful!');
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      setTimeout(() => {
        navigate('/connexion');
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <div className="inscription-container">
      <h2>Créer un compte</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form className="inscription-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Nom d'utilisateur :</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
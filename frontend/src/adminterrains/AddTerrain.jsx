import React, { useState } from 'react';
import axios from 'axios';

function AddTerrain({ fetchTerrains }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      await axios.post('http://localhost:5000/api/terrains', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSuccess('Terrain ajouté avec succès !');
      setFormData({ name: '', description: '', address: '', image: '' }); // Réinitialise le formulaire
      fetchTerrains(); // Rafraîchit la liste des terrains
    } catch  {
      setError('Erreur lors de l\'ajout du terrain.');
    }
  };

  return (
    <div className="add-terrain-container">
      <h3>Ajouter un nouveau terrain</h3>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Adresse :</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Image (URL) :</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-success">Ajouter</button>
      </form>
    </div>
  );
}

export default AddTerrain;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Terrain.css';

function Terrain() {
  const [terrains, setTerrains] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', address: '', image: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const role = localStorage.getItem('role'); // Récupérer le rôle de l'utilisateur

  // Récupérer les terrains depuis le backend
  const fetchTerrains = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/terrains');
      setTerrains(response.data);
    } catch  {
      setError('Erreur lors de la récupération des terrains.');
    }
  };

  // Ajouter un terrain
  const handleAddTerrain = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/terrains', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSuccess('Terrain ajouté avec succès.');
      fetchTerrains(); // Rafraîchir la liste des terrains
    } catch  {
      setError('Erreur lors de l\'ajout du terrain.');
    }
  };

  // Supprimer un terrain
  const handleDeleteTerrain = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/terrains/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSuccess('Terrain supprimé avec succès.');
      fetchTerrains(); // Rafraîchir la liste des terrains
    } catch  {
      setError('Erreur lors de la suppression du terrain.');
    }
  };

  useEffect(() => {
    fetchTerrains();
  }, []);

  return (
    <div className="terrain-container">
      <h2>Gestion des Terrains</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {/* Formulaire pour ajouter un terrain (visible uniquement pour admin et gestionnaire) */}
      {(role === 'admin' || role === 'gestionnaire') && (
        <form onSubmit={handleAddTerrain}>
          <input
            type="text"
            placeholder="Nom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Adresse"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <button type="submit">Ajouter un terrain</button>
        </form>
      )}

      {/* Liste des terrains */}
      <div className="terrain-list">
        {terrains.map((terrain) => (
          <div key={terrain.id} className="terrain-item">
            <h3>{terrain.name}</h3>
            <p>{terrain.description}</p>
            <p>{terrain.address}</p>
            <img src={terrain.image} alt={terrain.name} />
            {/* Bouton de suppression (visible uniquement pour admin et gestionnaire) */}
            {(role === 'admin' || role === 'gestionnaire') && (
              <button onClick={() => handleDeleteTerrain(terrain.id)}>Supprimer</button>
            )}
            {/* Bouton de réservation (visible uniquement pour les utilisateurs) */}
            {role === 'user' && (
              <button onClick={() => alert('Réservation effectuée !')}>Réserver</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Terrain;
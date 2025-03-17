import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminTerrains.css';

function AdminTerrains() {
  const [terrains, setTerrains] = useState([]);
  const [error, setError] = useState('');
  const [selectedTerrain, setSelectedTerrain] = useState(null); // Pour la mise à jour
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    image: ''
  });

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
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/terrains', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setFormData({ name: '', description: '', address: '', image: '' }); // Réinitialise le formulaire
      fetchTerrains(); // Rafraîchit la liste des terrains
    } catch  {
      setError('Erreur lors de l\'ajout du terrain.');
    }
  };

  // Supprimer un terrain
  const deleteTerrain = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/terrains/${id}`);
      setTerrains(terrains.filter((terrain) => terrain.id !== id));
    } catch  {
      setError('Erreur lors de la suppression du terrain.');
    }
  };

  // Pré-remplir le formulaire pour la mise à jour
  const handleEditClick = (terrain) => {
    setSelectedTerrain(terrain);
    setFormData({
      name: terrain.name,
      description: terrain.description,
      address: terrain.address,
      image: terrain.image
    });
  };

  // Mettre à jour un terrain
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/terrains/${selectedTerrain.id}`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSelectedTerrain(null); // Réinitialise le formulaire
      fetchTerrains(); // Rafraîchit la liste des terrains
    } catch  {
      setError('Erreur lors de la mise à jour du terrain.');
    }
  };

  useEffect(() => {
    fetchTerrains();
  }, []);

  return (
    <div className="admin-terrains-container">
      <h2>Gestion des Terrains</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Formulaire pour ajouter ou mettre à jour un terrain */}
      <div className="form-container">
        <h3>{selectedTerrain ? 'Modifier le terrain' : 'Ajouter un terrain'}</h3>
        <form onSubmit={selectedTerrain ? handleUpdateSubmit : handleAddSubmit}>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <label htmlFor="address">Adresse :</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />

          <label htmlFor="image">Image (URL) :</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />

          <button type="submit" className="btn btn-success">
            {selectedTerrain ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {selectedTerrain && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSelectedTerrain(null)}
            >
              Annuler
            </button>
          )}
        </form>
      </div>

      {/* Liste des terrains */}
      <div className="terrain-list">
        {terrains.map((terrain) => (
          <div key={terrain.id} className="terrain-item">
            <img src={terrain.image} alt={terrain.name} className="terrain-image" />
            <h3>{terrain.name}</h3>
            <p>{terrain.description}</p>
            <p>Adresse : {terrain.address}</p>
            <button className="btn btn-primary" onClick={() => handleEditClick(terrain)}>
              Modifier
            </button>
            <button className="btn btn-danger" onClick={() => deleteTerrain(terrain.id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTerrains;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Terrain.css';
import AddTerrain from './AddTerrain';

function Terrain() {
  const [terrains, setTerrains] = useState([]);
  const [error, setError] = useState('');

  // Récupérer les terrains depuis le backend
  const fetchTerrains = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/terrains');
      setTerrains(response.data);
    } catch  {
      setError('Erreur lors de la récupération des terrains.');
    }
  };

  // Supprimer un terrain
  const deleteTerrain = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/terrains/${id}`);
      setTerrains(terrains.filter((terrain) => terrain.id !== id));
    } catch {
      setError('Erreur lors de la suppression du terrain.');
    }
  };

  useEffect(() => {
    fetchTerrains();
  }, []);

  return (
    <div className="terrain-container">
      <h2>Nos Terrains</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Formulaire pour ajouter un terrain */}
      <AddTerrain fetchTerrains={fetchTerrains} />

      <div className="terrain-list">
        {terrains.map((terrain) => (
          <div key={terrain.id} className="terrain-item">
            <img src={terrain.image} alt={terrain.name} className="terrain-image" />
            <h3>{terrain.name}</h3>
            <p>{terrain.description}</p>
            <p>Adresse : {terrain.address}</p>
            <button className="btn btn-danger" onClick={() => deleteTerrain(terrain.id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Terrain;
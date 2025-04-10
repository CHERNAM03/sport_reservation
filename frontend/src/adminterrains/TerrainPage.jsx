import React from 'react';
import AddAvisForm from '../avis/AddAvisForm';
import AvisList from '../avis/AvisList';
import './TerrainPage.css';
const TerrainPage = ({ groundId }) => {
  return (
    <div>
      <h1>Détails du Terrain</h1>
      {/* Afficher les avis */}
      <AvisList groundId={groundId} />
      {/* Formulaire pour ajouter un avis */}
      <AddAvisForm groundId={groundId} />
    </div>
  );
};

export default TerrainPage;
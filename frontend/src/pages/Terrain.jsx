import React from 'react';
import './Terrain.css';

function Terrain() {
  return (
    <div className="terrain-container">
      <h2>Nos Terrains</h2>
      <div className="terrain-list">
        <div className="terrain-item">
          <h3>Terrain 1</h3>
          <p>Description du terrain 1...</p>
        </div>
        <div className="terrain-item">
          <h3>Terrain 2</h3>
          <p>Description du terrain 2...</p>
        </div>
        {/* ... autres terrains ... */}
      </div>
    </div>
  );
}

export default Terrain;
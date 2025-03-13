import React from 'react';
import './Terrain.css';

function Terrain() {
  return (
    <div className="terrain-container">
      <h2>Nos Terrains</h2>
      <div className="terrain-list">
        <div className="terrain-item">
          <img src="/images/terrain5.jpeg" alt="Terrain 1" className="terrain-image" />
          <h3>Terrain 1</h3>
          <p>Description du terrain 1...</p>
          <p>Adresse : 123 Rue du Sport, Paris</p>
          <button className="btn btn-success">Réserver</button>
        </div>
        <div className="terrain-item">
          <img src="/images/terrain2.jpeg" alt="Terrain 2" className="terrain-image" />
          <h3>Terrain 2</h3>
          <p>Description du terrain 2...</p>
          <p>Adresse : 456 Avenue des Athlètes, Lyon</p>
          <button className="btn btn-success">Réserver</button>
        </div>
        <div className="terrain-item">
          <img src="/images/terrain3.jpeg" alt="Terrain 3" className="terrain-image" />
          <h3>Terrain 3</h3>
          <p>Description du terrain 3...</p>
          <p>Adresse : 789 Boulevard des Champions, Marseille</p>
          <button className="btn btn-success">Réserver</button>
        </div>
        <div className="terrain-item">
          <img src="/images/terrain7.jpeg" alt="Terrain 4" className="terrain-image" />
          <h3>Terrain 4</h3>
          <p>Description du terrain 4...</p>
          <p>Adresse : 101 Rue des Victoires, Bordeaux</p>
          <button className="btn btn-success">Réserver</button>
        </div>
        <div className="terrain-item">
          <img src="/images/terrain8.jpeg" alt="Terrain 5" className="terrain-image" />
          <h3>Terrain 5</h3>
          <p>Description du terrain 5...</p>
          <p>Adresse : 202 Avenue des Gagnants, Lille</p>
          <button className="btn btn-success">Réserver</button>
        </div>
        <div className="terrain-item">
          <img src="/images/terrain6.jpeg" alt="Terrain 6" className="terrain-image" />
          <h3>Terrain 6</h3>
          <p>Description du terrain 6...</p>
          <p>Adresse : 303 Boulevard des Héros, Toulouse</p>
          <button className="btn btn-success">Réserver</button>
        </div>
        {/* ... autres terrains ... */}
      </div>
    </div>
  );
}

export default Terrain;
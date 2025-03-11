import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Réservation simple partout en Ile de France</h1>
        <p>Réservez votre terrain en quelques clics, 24h/24 et 7/7.</p>
        <div className="blocks">
          <div className="block">
            <h2>Des terrains partout en Ile de France</h2>
            <p>Plus de 2254 Terrains dans toute la région Ile de France.</p>
          </div>
          <div className="block">
            <h2>Des terrains partout en Ile de France</h2>
            <p>Plus de 2254 Terrains dans toute la région Ile de France.</p>
          </div>
          <div className="block">
            <h2>Des terrains partout en Ile de France</h2>
            <p>Plus de 2254 Terrains dans toute la région Ile de France.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
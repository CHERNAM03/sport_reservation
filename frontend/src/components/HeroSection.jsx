
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'; // Assurez-vous d'avoir les styles personnalisés nécessaires

function HeroSection() {
  const navigate = useNavigate(); // Hook pour la redirection

  const handleReservationClick = () => {
    navigate('/reservation'); // Redirige vers la page de réservation
  };
  return (
    <div className="hero-section">
     
      <div  className= "container text-center">
        <h1>Bienvenue sur MonTerrain</h1>
        <p className="lead">Réservez vos terrains de football en quelques clics.</p>
        <button className="btn btn-success btn-lg" onClick={handleReservationClick}>
          Réserver maintenant
        </button>
      </div>
      <div className="card text-bg-dark mt-5">
        <img src="/images/test2.jpeg" className="card-img" alt="Stade" />
        <div className="card-img-overlay d-flex flex-column justify-content-center">
          <h5 className="card-title">La communauté des footballeurs connectés.</h5>
          <p className="card-text">
            "Avec notre application, l'organisation de tes matchs n'a jamais été aussi simple. Ton terrain, à portée de clic."
          </p>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="feature-card">
              <h3>Réservation simple partout en Ile de France</h3>
              <p>Réservez votre terrain en quelques clics, 24h/24 et 7j/7.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <h3>Des terrains partout en Ile de France</h3>
              <p>Plus de 2254 Terrains dans toute la région Ile de France.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <h3>Des terrains partout en Ile de France</h3>
              <p>Plus de 2254 Terrains dans toute la région Ile de France.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleReservationClick = () => {
    navigate('/reservation');
  };

  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className={`hero-content container ${isVisible ? 'fade-in' : ''}`}>
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6 text-white">
            <h1 className="display-3 fw-bold mb-4">
              Réservez votre terrain de sport en quelques clics
            </h1>
            <p className="lead mb-5">
              Découvrez plus de 2000 terrains de football en Île-de-France. 
              Réservation simple, rapide et sécurisée.
            </p>
            <div className="d-flex gap-3">
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleReservationClick}
              >
                Réserver maintenant <ArrowRight className="ms-2" />
              </button>
              <button className="btn btn-outline-light btn-lg">
                En savoir plus
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-stats-grid">
              <div className="hero-stat-card">
                <Calendar size={32} />
                <h3>24/7</h3>
                <p>Disponibilité</p>
              </div>
              <div className="hero-stat-card">
                <MapPin size={32} />
                <h3>2000+</h3>
                <p>Terrains</p>
              </div>
              <div className="hero-stat-card">
                <Users size={32} />
                <h3>50k+</h3>
                <p>Utilisateurs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
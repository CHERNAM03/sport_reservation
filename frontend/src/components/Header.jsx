import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <span className="brand-my">MON</span>TERRAIN
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="index.html">Accueil</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="reservation.html">Réserver</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="terrain.html">Terrain</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="login.html">Connexion</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Recherche terrain" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit"><i className="bi bi-search"></i></button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
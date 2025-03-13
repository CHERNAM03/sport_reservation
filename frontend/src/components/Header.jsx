import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="brand-my">MON</span>TERRAIN
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Accueil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reservation">Réserver</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/terrain">Terrain</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/connexion">Connexion</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
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
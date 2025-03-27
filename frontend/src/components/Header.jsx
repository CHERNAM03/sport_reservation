import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, User, Menu } from 'lucide-react';
import './Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-main">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="brand-highlight">MON</span>TERRAIN
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Accueil</Link>
              </li>

              <li className="nav-item dropdown">
                <Link 
                  className="nav-link dropdown-toggle" 
                  to="#" 
                  role="button" 
                  data-bs-toggle="dropdown"
                >
                  Sports <ChevronDown size={16} />
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/sports/football">Football</Link></li>
                  <li><Link className="dropdown-item" to="/sports/basketball">Basketball</Link></li>
                  <li><Link className="dropdown-item" to="/sports/tennis">Tennis</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/sports/all">Tous les sports</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <Link 
                  className="nav-link dropdown-toggle" 
                  to="#" 
                  role="button" 
                  data-bs-toggle="dropdown"
                >
                  Réservations <ChevronDown size={16} />
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/reservation/new">Nouvelle réservation</Link></li>
                  <li><Link className="dropdown-item" to="/reservation/history">Historique</Link></li>
                  <li><Link className="dropdown-item" to="/reservation/upcoming">À venir</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>

            <div className="nav-right d-flex align-items-center">
              <form className="search-form me-3">
                <div className="input-group">
                  <input 
                    type="search" 
                    className="form-control" 
                    placeholder="Rechercher..." 
                  />
                  <button className="btn btn-outline-light" type="submit">
                    <Search size={18} />
                  </button>
                </div>
              </form>

              <div className="user-menu dropdown">
                <button 
                  className="btn btn-link nav-link dropdown-toggle d-flex align-items-center" 
                  data-bs-toggle="dropdown"
                >
                  <User size={20} className="me-2" />
                  <span>Mon Compte</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><Link className="dropdown-item" to="/reservations">Mes réservations</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/admin">Admin Panel</Link></li>
                  <li><Link className="dropdown-item" to="/logout">Déconnexion</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
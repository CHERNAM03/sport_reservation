import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Search, User, Menu } from 'lucide-react';
import { Dropdown } from 'bootstrap';
import './Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer les données de l'utilisateur du localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('username'); // Supprimer le nom d'utilisateur
    console.log('Nom d\'utilisateur supprimé lors de la déconnexion.');
    // Rediriger l'utilisateur vers la page de connexion
    navigate('/login');
  };

  useEffect(() => {
    // Initialize all dropdowns
    const dropdownElements = document.querySelectorAll('.dropdown-toggle');
    dropdownElements.forEach(element => {
      new Dropdown(element);
    });

    // Récupérer le nom d'utilisateur depuis localStorage
    const storedUsername = localStorage.getItem('username');
    console.log('Nom d\'utilisateur récupéré :', storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <header className="header-main">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="brand-highlight">MON</span>TERRAIN
          </Link>
          
          {/* User icon visible on mobile and desktop, but doesn't open a menu on mobile */}
          <div className="account-icon-mobile d-flex d-lg-none" onClick={() => setIsOpen(true)}>
            <User size={20} className="text-white" />
          </div>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <div className="ms-auto d-flex align-items-center">
              <ul className="navbar-nav w-100">
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
                    Terrains <ChevronDown size={16} />
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/sports/football">Terrain en gazon naturel</Link></li>
                    <li><Link className="dropdown-item" to="/sports/basketball">Terrain en gazon synthétique</Link></li>
                    <li><Link className="dropdown-item" to="/sports/tennis">Terrain hybride</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/grounds">Tous les terrains</Link></li>
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
                    <li><Link className="dropdown-item" to="/reservations">Gérer les réservations</Link></li>
                    <li><Link className="dropdown-item" to="/reservation/new">Nouvelle réservation</Link></li>
                    <li><Link className="dropdown-item" to="/reservations/upcoming">Réservations à venir</Link></li>
                    <li><Link className="dropdown-item" to="/reservations/history">Historique des réservations</Link></li>
                  </ul>
                </li>

                {/* Mon Compte ajouté comme nav-item standard dans mobile */}
                <li className="nav-item user-menu-mobile d-block d-lg-none">
                  <Link className="nav-link user-nav-link" to="/profile">
                    <strong>Mon Compte</strong> {username ? `(${username})` : ''}
                  </Link>
                </li>
                <li className="nav-item d-block d-lg-none">
                  <Link className="nav-link" to="/profile">Mon profil</Link>
                </li>
                <li className="nav-item d-block d-lg-none">
                  <Link className="nav-link" to="/reservations">Mes réservations</Link>
                </li>
                <li className="nav-item d-block d-lg-none">
                  <Link className="nav-link" to="/admin">Admin Panel</Link>
                </li>
                <li className="nav-item d-block d-lg-none">
                  <button className="nav-link btn-logout w-100 text-left" onClick={handleLogout}>
                    Déconnexion
                  </button>
                </li>
              </ul>

              {/* User menu dropdown for desktop only */}
              <div className="nav-right d-none d-lg-flex align-items-center ms-3">
                <div className="user-menu dropdown">
                  <button 
                    className="btn btn-link nav-link dropdown-toggle d-flex align-items-center" 
                    data-bs-toggle="dropdown"
                  >
                    <User size={20} className="me-2" />
                    <span>{username ? username : 'Mon Compte'}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link className="dropdown-item" to="/profile">Profil</Link></li>
                    <li><Link className="dropdown-item" to="/reservations">Mes réservations</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/admin">Admin Panel</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
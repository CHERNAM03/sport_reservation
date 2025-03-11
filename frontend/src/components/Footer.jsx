import React from 'react';
import './Footer.css';



  function Footer() {
    return (
      <footer className="footer py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-4 text-center text-md-start">
              <img src="/MonTerrain/frontend/public/images/logo.png" alt="MonTerrain" className="footer-logo img-fluid mb-3" width="150" />
              <p className="text-muted">Trouvez et réservez facilement votre terrain de football.</p>
            </div>
            <div className="col-12 col-md-4">
              <h5 className="footer-heading mb-3">Liens rapides</h5>
              <ul className="list-unstyled footer-links">
                <li><a href="/" className="text-decoration-none">À propos</a></li>
                <li><a href="/terrain" className="text-decoration-none">Nos terrains</a></li>
                <li><a href="/contact" className="text-decoration-none">Contact</a></li>
                <li><a href="#" className="text-decoration-none">FAQ</a></li>
              </ul>
            </div>
            <div className="col-12 col-md-4">
              <h5 className="footer-heading mb-3">Suivez-nous</h5>
              <div className="social-icons d-flex gap-3">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i> {/* Utilisez className ici aussi */}
                </a>
                <a href="#" className="social-icon" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col-12">
              <p className="text-center text-muted mb-0">
                © 2025 MonTerrain. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  




export default Footer;
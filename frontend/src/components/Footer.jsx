import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import custom CSS

function Footer() {
    return (
        <footer className="modern-footer full-width-footer">
        <div className="row full-width-row g-4">
            <div className="col-12 col-md-4 footer-segment logo-segment">
            <Link className="navbar-brand footer-logo" to="/">
                <span className="brand-highlight">MON</span>TERRAIN
            </Link>
            <p className="footer-text">Trouvez et réservez facilement votre terrain de football.</p>
            </div>
            <div className="col-12 col-md-4 footer-segment links-segment">
               <h5 className="footer-heading mb-3">Liens rapides</h5>
                 <ul className="list-unstyled footer-links">
                    <li><a href="/" className="footer-link">À propos</a></li>
                    <li><a href="/terrain" className="footer-link">Nos terrains</a></li>
                    <li><a href="/contact" className="footer-link">Contact</a></li>
                    <li><a href="#" className="footer-link">FAQ</a></li>
                 </ul>
            </div>
            <div className="col-12 col-md-4 footer-segment social-segment">
            <h5 className="footer-heading mb-3 text-center text-md-start">Suivez-nous</h5>
                <div className="social-icons d-flex justify-content-center justify-content-md-start gap-3">
                    <a href="https://facebook.com" className="social-icon" aria-label="Facebook">
                        <i className="bi bi-facebook"></i>
                      </a>
                    <a href="https://youtube.com" className="social-icon" aria-label="YouTube">
                        <i className="bi bi-youtube"></i>
                    </a>
                    <a href="https://twitter.com" className="social-icon" aria-label="Twitter">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://instagram.com" className="social-icon" aria-label="Instagram">
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
        <div className="footer-bottom full-width-bottom">
             <p className="footer-copyright mb-0 text-center border-top">
               © 2025 MonTerrain. Tous droits réservés.
            </p>
         </div>
    </footer>
    );
}

export default Footer;
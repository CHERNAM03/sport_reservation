import React from 'react';
import './Footer.css'; // Import custom CSS

function Footer() {
    return (
        <footer className="modern-footer">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12 col-md-4 text-center text-md-start">
                        <img src="/images/logo.png" alt="MonTerrain" className="footer-logo img-fluid mb-3" width="150" />
                        <p className="footer-text">Trouvez et réservez facilement votre terrain de football.</p>
                    </div>
                    <div className="col-12 col-md-4">
                        <h5 className="footer-heading mb-3">Liens rapides</h5>
                        <ul className="list-unstyled footer-links">
                            <li><a href="/" className="footer-link">À propos</a></li>
                            <li><a href="/terrain" className="footer-link">Nos terrains</a></li>
                            <li><a href="/contact" className="footer-link">Contact</a></li>
                            <li><a href="#" className="footer-link">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4">
                        <h5 className="footer-heading mb-3">Suivez-nous</h5>
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
                    <div className="col-12">
                        <p className="footer-copyright mb-0">
                            © 2025 MonTerrain. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
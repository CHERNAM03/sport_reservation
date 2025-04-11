import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Award, CheckCircle } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';
import HeroVideo from '../../assets/hero-video.mp4';

const LandingPage = () => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        setIsAnimated(true);
        // Ensure video autoplay works
        const video = document.querySelector('.hero-video');
        if (video) {
            video.play().catch(function(error) {
                console.log("Video play failed:", error);
            });
        }
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section position-relative vh-100">
                <div className="video-overlay"></div>
                <video 
                    className="hero-video position-absolute w-100 h-100 object-fit-cover"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                >
                    <source src={HeroVideo} type="video/mp4" />
                </video>
                <div className="hero-content position-relative z-1 text-center text-white">
                    <h1 className={`display-3 fw-bold mb-4 ${isAnimated ? 'fade-in' : ''}`}>
                        Bienvenue sur MonTerrain
                    </h1>
                    <p className={`lead mb-4 ${isAnimated ? 'slide-up' : ''}`}>
                        Reserver votre terrain de football en quelques clics.
                    </p>
                    <Link 
                        to="/signup" 
                        className={`btn btn-primary btn-lg ${isAnimated ? 'scale-in' : ''}`}
                    >
                        Get Started <ArrowRight className="ms-2" />
                    </Link>
                </div>
            </section>

            {/* Features Section */}
         {/* Features Section */}
<section className="features-section py-5">
     {/* Section Title */}
     <div className="text-center mb-5">
            <h2>Pourquoi nous choisir ?</h2>
        </div>
    <div className="container">
       
        <div className="row g-4">
            <div className="col-md-4">
                <div className="feature-card p-4 bg-white rounded-3 shadow-sm h-100">
                    <Calendar className="feature-icon text-primary mb-3" size={48} />
                    <h3 className="h5 mb-3">Réservation facile</h3>
                    <p className="text-muted">Réservez votre lieu sportif préféré en quelques clics</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="feature-card p-4 bg-white rounded-3 shadow-sm h-100">
                    <Users className="feature-icon text-primary mb-3" size={48} />
                    <h3 className="h5 mb-3">Sports variés</h3>
                    <p className="text-muted">Choisissez parmi une large gamme d'installations sportives</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="feature-card p-4 bg-white rounded-3 shadow-sm h-100">
                    <Award className="feature-icon text-primary mb-3" size={48} />
                    <h3 className="h5 mb-3">Qualité garantie</h3>
                    <p className="text-muted">Tous les lieux sont vérifiés selon des normes de qualité</p>
                </div>
            </div>
        </div>
    </div>
</section>
        </div>
    );
};

export default LandingPage;
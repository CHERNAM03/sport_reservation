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
                        Bienvenue sue MonTerrain
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
            <section className="features-section py-5">
                <div className="container">
                    <h2 className="text-center mb-5">Why Choose Us?</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-card p-4 bg-white rounded-3 shadow-sm h-100">
                                <Calendar className="feature-icon text-primary mb-3" size={48} />
                                <h3 className="h5 mb-3">Easy Booking</h3>
                                <p className="text-muted">Book your favorite sports venue in just a few clicks</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card p-4 bg-white rounded-3 shadow-sm h-100">
                                <Users className="feature-icon text-primary mb-3" size={48} />
                                <h3 className="h5 mb-3">Multiple Sports</h3>
                                <p className="text-muted">Choose from a wide variety of sports facilities</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card p-4 bg-white rounded-3 shadow-sm h-100">
                                <Award className="feature-icon text-primary mb-3" size={48} />
                                <h3 className="h5 mb-3">Quality Assured</h3>
                                <p className="text-muted">All venues are verified for quality standards</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'; // Custom CSS for animations and styles
import HeroVideo from '../../assets/hero-video.mp4';
import FeatureImage1 from '../../assets/feature-1.png';
import FeatureImage2 from '../../assets/feature-2.png';
import FeatureImage3 from '../../assets/feature-3.png';


const LandingPage = () => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        setIsAnimated(true); // Trigger animation on mount
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <video autoPlay muted loop className="hero-video">
                    <source src={HeroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-content">
                    <h1 className={`hero-title ${isAnimated ? 'fade-in' : ''}`}>
                        Effortless Sports Facility Booking & Management
                    </h1>
                    <p className={`hero-subtitle ${isAnimated ? 'slide-up' : ''}`}>
                        Simplify your booking process and maximize facility utilization.
                    </p>
                    <button className={`hero-cta ${isAnimated ? 'scale-in' : ''}`}>
                        Get Started Free
                    </button>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2>Key Features</h2>
                    <div className="row">
                        <div className="col-md-4 feature-item">
                            <img src={FeatureImage1} alt="Online Booking" className="feature-image" />
                            <h3>Online Booking</h3>
                            <p>Allow users to book facilities online 24/7.</p>
                        </div>
                        <div className="col-md-4 feature-item">
                            <img src={FeatureImage2} alt="Ground Management" className="feature-image" />
                            <h3>Ground Management</h3>
                            <p>Easily manage ground availability and schedules.</p>
                        </div>
                        <div className="col-md-4 feature-item">
                            <img src={FeatureImage3} alt="User Management" className="feature-image" />
                            <h3>User Management</h3>
                            <p>Manage users, roles, and permissions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section, Testimonials, Pricing, CTA, Footer (Add as needed) */}
            {/* ... */}
        </div>
    );
};

export default LandingPage;
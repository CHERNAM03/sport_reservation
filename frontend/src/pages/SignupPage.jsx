import React from 'react';
import './SignupPage.css'; // Import custom CSS
import illustration from '../assets/feature-1.jpg'; // Replace with your illustration
import { Link } from 'react-router-dom';
const SignupPage = () => {
    return (
        <div className="signup-page-tasky">
            <div className="signup-form-container">
                <h1 className="signup-heading">Create Account</h1>
                <p className="signup-details">Please enter your details to create an account</p>
                <form className="signup-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" placeholder="Confirm your password" />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <p className="login-link">Already have an account? <Link  to="/login"> login </Link></p>
            </div>
            <div className="illustration-container">
                <img src={illustration} alt="Tasky Illustration" className="tasky-illustration" />
                <p className="illustration-text">Manage your task in a easy and more efficient way with Tasky...</p>
                <div className="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
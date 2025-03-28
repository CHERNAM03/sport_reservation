import React from 'react';
import './AuthStyle.css'; // Import custom CSS
import illustration from '../assets/feature-1.jpg'; // Replace with your illustration
import { Link } from 'react-router-dom';
const LoginPageTasky = () => {
    return (
        <div className="login-page-tasky">
            <div className="login-form-container">
                <h1 className="welcome-heading">Welcome Back!</h1>
                <p className="login-details">Please enter login details below</p>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter the email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter the Password" />
                    </div>
                    <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    <button type="submit" className="sign-in-button">Sign in</button>
                </form>
                <div className="or-continue">
                    <hr />
                    <span>Or continue</span>
                    <hr />
                </div>
                <button className="google-login-button">Log in with Google</button>
                <p className="signup-link">Don't have an account? <Link  to="/signup">Sign up</Link></p>
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

export default LoginPageTasky;
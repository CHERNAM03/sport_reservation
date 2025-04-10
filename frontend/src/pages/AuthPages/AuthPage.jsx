import React, { useState } from 'react';
import './AuthStyle.css'; // Import custom CSS
import illustration from '../../assets/feature-1.jpg'; // Replace with your illustration
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPageTasky = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const requestBody = {
            email,
            password,
        };

        const requestBodyJSON = JSON.stringify(requestBody);
        const contentLength = requestBodyJSON.length.toString();

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': contentLength, // Ajout manuel (généralement inutile avec axios)
                    },
                }
            );

            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('authToken', token);
                localStorage.setItem('userRole', user.role);
                navigate('/grounds');
            } else {
                setError('Email ou mot de passe invalide.');
            }
        } catch (err) {
            console.error('Erreur lors de la connexion front-end:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Une erreur est survenue lors de la connexion.');
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="login-page-tasky">
            <div className="login-form-container">
                <h1 className="welcome-heading">Welcome Back!</h1>
                <p className="login-details">Please enter login details below</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter the email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter the Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    <button type="submit" className="sign-in-button">Sign in</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="or-continue">
                    <hr />
                    <span>Or continue</span>
                    <hr />
                </div>
                <button className="google-login-button">Log in with Google</button>
                <p className="signup-link">Don't have an account? <Link to="/signup">Sign up</Link></p>
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
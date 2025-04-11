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

        // const requestBodyJSON = JSON.stringify(requestBody);
        // const contentLength = requestBodyJSON.length.toString();

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Content-Length': contentLength, // Ajout manuel (généralement inutile avec axios)
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
        <h1 className="welcome-heading">Bienvenue !</h1>
        <p className="login-details">Veuillez entrer vos identifiants ci-dessous</p>
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Adresse e-mail</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Entrez votre adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <a href="/forgot-password" className="forgot-password">Mot de passe oublié ?</a>
            <button type="submit" className="sign-in-button">Se connecter</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="or-continue">
            <hr />
            <span>Ou continuer</span>
            <hr />
        </div>
        <button className="google-login-button">Se connecter avec Google</button>
        <p className="signup-link">Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous</Link></p>
    </div>
    <div className="illustration-container">
        <img src={illustration} alt="Illustration Tasky" className="tasky-illustration" />
        <p className="illustration-text">Gérez vos tâches de manière simple et efficace avec Tasky...</p>
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
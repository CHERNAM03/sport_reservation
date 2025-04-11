import React, { useState } from 'react';
import './SignupPage.css';
import illustration from '../../assets/feature-1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUserName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                username,
                email,
                password
            });

            if (response.status === 201) {
                // Successful registration
                navigate('/login'); // Redirect to login page
            } else {
                setError('Registration failed.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="signup-page-tasky">
        <div className="signup-form-container">
            <h1 className="signup-heading">Créer un compte</h1>
            <p className="signup-details">Veuillez entrer vos informations pour créer un compte</p>
            <form className="signup-form" onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="form-group">
                    <label htmlFor="userName">Nom d'utilisateur</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Entrez votre nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirmez votre mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="signup-button">S'inscrire</button>
            </form>
            <p className="login-link">
                Vous avez déjà un compte ? <Link to="/login"> Connectez-vous </Link>
            </p>
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

export default SignupPage;
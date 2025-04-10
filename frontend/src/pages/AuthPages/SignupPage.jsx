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
                password,
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
                <h1 className="signup-heading">Create Account</h1>
                <p className="signup-details">Please enter your details to create an account</p>
                <form className="signup-form" onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="form-group">
                        <label htmlFor="userName">userName</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your user name"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/login"> login </Link>
                </p>
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
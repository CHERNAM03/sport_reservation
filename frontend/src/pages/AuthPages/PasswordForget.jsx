import React, { useState } from 'react';
import './PasswordForget.css'; // Import custom CSS
import illustration from '../../assets/feature-1.jpg'; // Replace with your illustration

const PasswordForget = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        // Simulate password reset request (replace with your actual API call)
        try {
            // Replace with your API call to send password reset email
            console.log('Password reset requested for:', email);

            // Simulate success
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
            setMessage('Password reset email sent. Please check your inbox.');
        } catch (err) {
            setError('Failed to send password reset email. Please try again.');
            console.error('Password reset error:', err);
        }
    };

    return (
        <div className="password-forget-container">
            <div className="password-forget-card">
                <h2 className="password-forget-title">Forgot Password?</h2>
                <p className="password-forget-text">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmit} className="password-forget-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="password-forget-input"
                        />
                    </div>
                    <button type="submit" className="password-forget-button">
                        Reset Password
                    </button>
                </form>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default PasswordForget;
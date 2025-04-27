import React, { useState } from 'react';
import api from '../api/api';
import './NewReservationPage.css';

const NewReservationPage = () => {
    const [groundId, setGroundId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const resetForm = () => {
        setGroundId('');
        setDate('');
        setTime('');
        setDuration('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        // Validation simple
        if (!groundId || !date || !time || !duration) {
            setError('Veuillez remplir tous les champs');
            setIsSubmitting(false);
            return;
        }

        try {
            const _ = await api.post('/reservations', { 
                groundId, 
                date, 
                time, 
                duration 
            });
            
            setSuccess('Réservation créée avec succès.');
            resetForm(); // Réinitialiser le formulaire après succès
        } catch (err) {
            console.error('Erreur lors de la création de la réservation :', err);
            // Message d'erreur plus spécifique si disponible
            setError(err.response?.data?.message || 'Impossible de créer la réservation.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="new-reservation-page">
            <h1>Nouvelle Réservation</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Terrain ID :</label>
                    <input
                        type="text"
                        value={groundId}
                        onChange={(e) => setGroundId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date :</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]} // Date minimum = aujourd'hui
                        required
                    />
                </div>
                <div>
                    <label>Heure :</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Durée (en minutes) :</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        min="30"
                        max="240"
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Création en cours...' : 'Créer Réservation'}
                </button>
            </form>
        </div>
    );
};

export default NewReservationPage;
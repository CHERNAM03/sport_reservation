import React, { useState, useEffect } from 'react';
import './ReservationsPage.css'; // Ajoutez un fichier CSS pour le style
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReservationsPage = () => {
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Récupérer le token JWT
                const response = await axios.get('http://localhost:5000/api/reservations/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { upcoming, past } = response.data;

                setUpcomingReservations(upcoming);
                setPastReservations(past);
            } catch (err) {
                console.error('Erreur lors de la récupération des réservations :', err);
                setError('Impossible de charger les réservations.');
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className="reservations-page">
            <h1>Gestion des Réservations</h1>

            {error && <p className="error-message">{error}</p>}

            <div className="reservations-section">
                <h2>Réservations à venir</h2>
                {upcomingReservations.length > 0 ? (
                    <ul className="reservations-list">
                        {upcomingReservations.map((reservation) => (
                            <li key={reservation.id} className="reservation-item">
                                <p><strong>Terrain :</strong> {reservation.Terrain.name}</p>
                                <p><strong>Date :</strong> {reservation.date}</p>
                                <p><strong>Heure :</strong> {reservation.time}</p>
                                <p><strong>Durée :</strong> {reservation.duration} minutes</p>
                                <p><strong>Statut :</strong> {reservation.status}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune réservation à venir.</p>
                )}
            </div>

            <div className="reservations-section">
                <h2>Historique des Réservations</h2>
                {pastReservations.length > 0 ? (
                    <ul className="reservations-list">
                        {pastReservations.map((reservation) => (
                            <li key={reservation.id} className="reservation-item">
                                <p><strong>Terrain :</strong> {reservation.Terrain.name}</p>
                                <p><strong>Date :</strong> {reservation.date}</p>
                                <p><strong>Heure :</strong> {reservation.time}</p>
                                <p><strong>Durée :</strong> {reservation.duration} minutes</p>
                                <p><strong>Statut :</strong> {reservation.status}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune réservation passée.</p>
                )}
            </div>

            <div className="new-reservation">
                <Link to="/reservation/new" className="btn btn-primary">
                    Nouvelle Réservation
                </Link>
            </div>
        </div>
    );
};

export default ReservationsPage;
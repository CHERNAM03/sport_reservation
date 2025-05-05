import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifiez si l'utilisateur est connecté
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login'); // Redirigez vers la page de connexion si non connecté
        } else {
            fetchUserData();
            fetchUserReservations();
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur :', error);
        }
    };

    const fetchUserReservations = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reservations', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations :', error);
        }
    };

    return (
        <div className="user-page">
            <h1>Bienvenue, {user?.username || 'Utilisateur'}</h1>
            <div className="user-actions">
                <Link to="/reservations" className="btn btn-primary">Mes Réservations</Link>
                <Link to="/edit-profile" className="btn btn-secondary">Modifier mon profil</Link>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        localStorage.removeItem('authToken');
                        navigate('/login');
                    }}
                >
                    Déconnexion
                </button>
            </div>
            <div className="user-reservations">
                <h2>Mes Réservations</h2>
                {reservations.length > 0 ? (
                    <ul>
                        {reservations.map((reservation) => (
                            <li key={reservation.id}>
                                Terrain : {reservation.groundName} - Date : {reservation.date}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Vous n'avez aucune réservation.</p>
                )}
            </div>
        </div>
    );
};

export default UserPage;
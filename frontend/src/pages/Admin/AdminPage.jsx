import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [error, setError] = useState(null);
    const [errorReviews, setErrorReviews] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Nombre d'utilisateurs par page
    const navigate = useNavigate();
    const [statistics, setStatistics] = useState({
        totalUsers: 0,
        totalReviews: 0,
        totalTerrains: 0,
    });

    // Vérifier l'authentification au chargement du composant
    useEffect(() => {
        // Utiliser la même clé que dans PrivateRoute
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }
    }, [navigate]);

    // Récupérer les utilisateurs
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Utiliser la même clé que dans PrivateRoute
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('Vous devez être connecté pour accéder à cette page');
                }

                const response = await fetch('http://localhost:5000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        navigate('/login');
                        return;
                    }
                    throw new Error('Erreur lors du chargement des utilisateurs');
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    // Récupérer les avis
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Utiliser la même clé que dans PrivateRoute
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('Vous devez être connecté pour accéder à cette page');
                }

                const response = await fetch('http://localhost:5000/api/avis', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        navigate('/login');
                        return;
                    }
                    throw new Error('Erreur lors du chargement des avis');
                }

                const data = await response.json();
                setReviews(data);
            } catch (err) {
                setErrorReviews(err.message);
            } finally {
                setLoadingReviews(false);
            }
        };

        fetchReviews();
    }, [navigate]);

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (userId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            return;
        }

        try {
            // Utiliser la même clé que dans PrivateRoute
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'utilisateur');
            }

            setUsers(users.filter(user => user.id !== userId));
            alert('Utilisateur supprimé avec succès');
            
            // Mettre à jour les statistiques après suppression
            fetchStatistics();
        } catch (err) {
            setError(err.message);
        }
    };

    // Fonction pour supprimer un avis
    const deleteReview = async (reviewId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
            return;
        }

        try {
            // Utiliser la même clé que dans PrivateRoute
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:5000/api/avis/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'avis');
            }

            setReviews(reviews.filter(review => review.id !== reviewId));
            alert('Avis supprimé avec succès');
            
            // Mettre à jour les statistiques après suppression
            fetchStatistics();
        } catch (err) {
            alert(`Impossible de supprimer l'avis : ${err.message}`);
        }
    };

    // Fonction pour récupérer les statistiques
    const fetchStatistics = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/statistics/stats');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des statistiques');
            }
            const data = await response.json();
            setStatistics(data);
        } catch (error) {
            console.error('Erreur fetchStatistics :', error.message);
        }
    };

    // Récupérer les statistiques au chargement et toutes les 30 secondes
    useEffect(() => {
        fetchStatistics();
        
        // Mettre à jour les statistiques toutes les 30 secondes
        const interval = setInterval(() => {
            fetchStatistics();
        }, 30000);
        
        // Nettoyer l'intervalle lorsque le composant est démonté
        return () => clearInterval(interval);
    }, []);

    // Gestion de la recherche et de la pagination
    const filteredUsers = users.filter((user) =>
        (user.username || user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            <div className="admin-content">
                {/* Gestion des utilisateurs */}
                <section className="user-management">
                    <h2>Gestion des Utilisateurs</h2>
                    {loading && <p>Chargement des utilisateurs...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {!loading && !error && users.length === 0 && (
                        <p>Aucun utilisateur disponible.</p>
                    )}
                    {!loading && !error && users.length > 0 && (
                        <>
                            <input
                                type="text"
                                placeholder="Rechercher un utilisateur..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    marginBottom: '10px',
                                    padding: '5px',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                            <ul>
                                {paginatedUsers.map((user) => (
                                    <li key={user.id}>
                                        {user.username || user.name || 'Utilisateur sans nom'} - {user.email || 'Email non disponible'} - {user.role || 'Rôle non défini'}
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            style={{
                                                marginLeft: '10px',
                                                backgroundColor: 'red',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 10px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Supprimer
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="pagination">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Précédent
                                </button>
                                <span>Page {currentPage} sur {totalPages || 1}</span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                >
                                    Suivant
                                </button>
                            </div>
                        </>
                    )}
                </section>

                {/* Gestion des avis */}
                <section className="review-management">
                    <h2>Gestion des Avis</h2>
                    {loadingReviews && <p>Chargement des avis...</p>}
                    {errorReviews && <p style={{ color: 'red' }}>{errorReviews}</p>}
                    {!loadingReviews && !errorReviews && reviews.length === 0 && (
                        <p>Aucun avis disponible.</p>
                    )}
                    {!loadingReviews && !errorReviews && reviews.length > 0 && (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.id}>
                                    <p>
                                        <strong>{review.userName || `Utilisateur ${review.userId}`}</strong>: {review.comment}
                                    </p>
                                    <p>Note : {review.rating}/5</p>
                                    <button 
                                        onClick={() => deleteReview(review.id)}
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Supprimer
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* Statistiques */}
                <section className="statistics">
                    <h2>Statistiques</h2>
                    <div className="refresh-info">
                        <p><small>Mise à jour automatique toutes les 30 secondes</small></p>
                        <button 
                            onClick={fetchStatistics}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginBottom: '10px'
                            }}
                        >
                            Actualiser maintenant
                        </button>
                    </div>
                    <ul>
                        <li>
                            <i className="fas fa-users"></i> Nombre total d'utilisateurs : <span>{statistics.totalUsers || statistics.users || 0}</span>
                        </li>
                        <li>
                            <i className="fas fa-comments"></i> Nombre total d'avis : <span>{statistics.totalReviews || statistics.comments || 0}</span>
                        </li>
                        <li>
                            <i className="fas fa-futbol"></i> Terrains disponibles : <span>{statistics.totalTerrains || statistics.grounds || 0}</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default AdminPage;
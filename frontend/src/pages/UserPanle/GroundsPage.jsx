import React, { useState, useEffect } from 'react';
import './GroundsPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import api from '../../api/api';

const GroundsPage = () => {
    const [grounds, setGrounds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [actionType, setActionType] = useState(null); // 'add', 'update', 'delete'
    const [formData, setFormData] = useState({ name: '', location: '', price: '', id: '', description: '', address: '', image: '', availability: false });
    const [statistics, setStatistics] = useState({ users: 0, comments: 0, grounds: 0 }); // Ajout pour les statistiques
    const itemsPerPage = 4;
    
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    const role = localStorage.getItem('userRole') || 'guest';

    useEffect(() => {
        const fetchGrounds = async () => {
            try {
                const response = await api.get('/grounds');
                if (Array.isArray(response.data)) {
                    setGrounds(response.data);
                } else {
                    throw new Error('Les données retournées ne sont pas un tableau.');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Erreur lors de la récupération des terrains.');
            }
        };
        fetchGrounds();
        if (role === 'admin') {
            fetchStatistics(); // Récupérer les statistiques si l'utilisateur est admin
        }
    }, [role]);

    const fetchStatistics = async () => {
        try {
            const response = await api.get('/statistics/stats'); // Assurez-vous que cette route existe dans votre backend
            setStatistics(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques :', error);
        }
    };
    // Mettre à jour les statistiques périodiquement
    useEffect(() => {
        if (role === 'admin') {
            const interval = setInterval(() => {
                fetchStatistics();
            }, 10000); // Mise à jour toutes les 10 secondes
            
            return () => clearInterval(interval);
        }
    }, [role]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        if (value) {
            const filteredSuggestions = grounds.filter(ground =>
                (ground.name && ground.name.toLowerCase().includes(value)) ||
                (ground.location && ground.location.toLowerCase().includes(value)) ||
                (ground.price && ground.price.toString().includes(value)) ||
                (ground.description && ground.description.toLowerCase().includes(value)) ||
                (ground.address && ground.address.toLowerCase().includes(value))
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (ground) => {
        setSearchTerm(ground.postalCode || '');
        setSuggestions([]);
        setGrounds(grounds.filter(g => g.postalCode === ground.postalCode));
    };

    const filteredGrounds = searchTerm
        ? grounds.filter(ground =>
            (ground.name && ground.name.toLowerCase().includes(searchTerm)) ||
            (ground.location && ground.location.toLowerCase().includes(searchTerm)) ||
            (ground.price && ground.price.toString().includes(searchTerm)) ||
            (ground.description && ground.description.toLowerCase().includes(searchTerm)) ||
            (ground.address && ground.address.toLowerCase().includes(searchTerm))
        )
        : grounds;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGrounds = filteredGrounds.slice(indexOfFirstItem, indexOfLastItem);
    const displayedGrounds = searchTerm ? suggestions : currentGrounds;

    const totalPages = Math.ceil(filteredGrounds.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (actionType === 'add') {
                // Exclure 'id' de formData pour l'ajout
                const { id, ...dataWithoutId } = formData;
                await api.post('/grounds', dataWithoutId);
                alert('Terrain ajouté avec succès.');
            } else if (actionType === 'update') {
                // Inclure 'id' pour la mise à jour
                await api.put(`/grounds/${formData.id}`, formData);
                alert('Terrain mis à jour avec succès.');
            } else if (actionType === 'delete') {
                // Utiliser uniquement 'id' pour la suppression
                await api.delete(`/grounds/${formData.id}`);
                alert('Terrain supprimé avec succès.');
            }
            // Réinitialiser l'état après l'opération
            setActionType(null);
            setFormData({ name: '', location: '', price: '', id: '', description: '', address: '', image: '', availability: false });
        } catch (err) {
            console.error('Erreur lors de l\'opération :', err);
            alert('Erreur lors de l\'opération.');
        }
    };

    const handleDeleteReview = async () => {
        const reviewId = prompt('Entrez l\'ID de l\'avis à supprimer :');
        if (reviewId) {
            try {
                await api.delete(`/reviews/${reviewId}`);
                alert('Avis supprimé avec succès.');
            } catch (err) {
                alert('Erreur lors de la suppression de l\'avis.');
            }
        }
    };

    const handleManageManager = async () => {
        const managerId = prompt('Entrez l\'ID du gestionnaire à supprimer :');
        if (managerId) {
            try {
                await api.delete(`/managers/${managerId}`);
                alert('Gestionnaire supprimé avec succès.');
            } catch (err) {
                alert('Erreur lors de la suppression du gestionnaire.');
            }
        }
    };

    return (
        <div className="grounds-page">
            <div className="container">
                <div className="search-bar-container">
                    <input
                        type="text"
                        className="form-control search-bar"
                        placeholder="Rechercher par code postal, région ou nom"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions">
                            {suggestions.map(ground => (
                                <li key={ground.id} onClick={() => handleSuggestionClick(ground)}>
                                    {ground.name} ({ground.postalCode || 'N/A'}, {ground.area || 'N/A'})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="terrain-list">
                    {displayedGrounds.length > 0 ? (
                        displayedGrounds.map((terrain) => (
                            <Link key={terrain.id} to={`/ground/${terrain.id}`} className="terrain-item-link">
                                <div className="terrain-item">
                                    <img
                                        src={terrain.image || '/images/default.jpeg'}
                                        alt={terrain.name || 'Image indisponible'}
                                        className="terrain-image"
                                    />
                                    <h3>{terrain.name}</h3>
                                    <p>{terrain.description}</p>
                                    <p>Adresse : {terrain.address}</p>
                                    <p>Prix : {terrain.price} €</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Aucun terrain correspondant à votre recherche.</p>
                    )}
                </div>

                {filteredGrounds.length > itemsPerPage && (
                    <div className="pagination-container">
                        <button
                            className="btn btn-secondary pagination-button"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Précédent
                        </button>
                        <span className="pagination-info">Page {currentPage} sur {totalPages}</span>
                        <button
                            className="btn btn-secondary pagination-button"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Suivant
                        </button>
                    </div>
                )}
            </div>

            {role === 'gestionnaire' && (
                <div className="manager-actions">
                    <h2>Actions pour les gestionnaires</h2>
                    <button className="btn btn-primary" onClick={() => setActionType('add')}>Ajouter un terrain</button>
                    <button className="btn btn-secondary" onClick={() => setActionType('update')}>Mettre à jour un terrain</button>
                    <button className="btn btn-danger" onClick={() => setActionType('delete')}>Supprimer un terrain</button>
                    <Link to="/manager/dashboard" className="btn btn-info">Voir le bilan</Link>
                </div>
            )}

          
            {role === 'admin' && (
                <div className="admin-actions">
                    <h2>Actions pour les administrateurs</h2>
                    <button className="btn btn-danger" onClick={handleDeleteReview}>Supprimer un avis</button>
                    <button className="btn btn-secondary" onClick={handleManageManager}>Gérer les gestionnaires</button>
                    <Link to="/admin" className="btn btn-primary">Accéder à la page Admin</Link>

                    <h3>Statistiques</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Utilisateurs</td>
                                <td>{statistics.users}</td>
                            </tr>
                            <tr>
                                <td>Commentaires</td>
                                <td>{statistics.comments}</td>
                            </tr>
                            <tr>
                                <td>Terrains</td>
                                <td>{statistics.grounds}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}


            {actionType && (
                <div className="form-container">
                    <h3>{actionType === 'add' ? 'Ajouter un terrain' : actionType === 'update' ? 'Mettre à jour un terrain' : 'Supprimer un terrain'}</h3>
                    <form onSubmit={handleSubmit}>
                        {actionType !== 'delete' && (
                            <>
                                <div>
                                    <label>Nom :</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label>Emplacement :</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label>Prix :</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label>Description :</label>
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label>Adresse :</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label>Image URL :</label>
                                    <input type="text" name="image" value={formData.image} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label>Disponible :</label>
                                    <input type="checkbox" name="availability" checked={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.checked })} />
                                </div>
                            </>
                        )}
                        {actionType === 'delete' && (
                            <div>
                                <label>ID du terrain :</label>
                                <input type="text" name="id" value={formData.id} onChange={handleInputChange} required />
                            </div>
                        )}
                        <button type="submit" className="btn btn-success">Soumettre</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setActionType(null)}>Annuler</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GroundsPage;
import React, { useState, useEffect } from 'react';
import './GroundsPage.css'; // Import custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link
import api from '../../api/api'; 

const GroundsPage = () => {
    const [grounds, setGrounds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Nombre de terrains par page (2 colonnes x 2 lignes)

    const role = localStorage.getItem('userRole') || 'guest'; // Valeur par défaut : 'guest'

    // Charger les terrains depuis l'API
    useEffect(() => {
        const fetchGrounds = async () => {
            try {
                const response = await api.get('/grounds');
                console.log('Données retournées par l\'API :', response.data);
                if (Array.isArray(response.data)) {
                    setGrounds(response.data);
                } else {
                    throw new Error('Les données retournées ne sont pas un tableau.');
                }
            } catch (err) {
                console.error('Erreur lors de la récupération des terrains :', err);
                setError(err.response?.data?.message || 'Erreur lors de la récupération des terrains.');
            }
        };
        fetchGrounds();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    // Gestion de la recherche
    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
    
        if (value) {
            const filteredSuggestions = grounds.filter(ground =>
                (ground.name && ground.name.toLowerCase().includes(value)) ||
                (ground.location && ground.location.toLowerCase().includes(value)) ||
                (ground.price && ground.price.toString().includes(value)) || // Recherche par prix
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

    // Filtrer les terrains en fonction du terme de recherche
    const filteredGrounds = searchTerm
    ? grounds.filter(ground =>
        (ground.name && ground.name.toLowerCase().includes(searchTerm)) ||
        (ground.location && ground.location.toLowerCase().includes(searchTerm)) ||
        (ground.price && ground.price.toString().includes(searchTerm)) ||
        (ground.description && ground.description.toLowerCase().includes(searchTerm)) ||
        (ground.address && ground.address.toLowerCase().includes(searchTerm))
    )
    : grounds;

    // Pagination logic
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

    // Fonctionnalités spécifiques à l'admin
    const handleManageUsers = () => {
        // Redirigez vers une page de gestion des utilisateurs
        window.location.href = '/admin/users';
    };

    const handleDeleteReview = async () => {
        const reviewId = prompt('Entrez l\'ID de l\'avis à supprimer :');
        if (reviewId) {
            try {
                await api.delete(`/reviews/${reviewId}`);
                alert('Avis supprimé avec succès.');
            } catch (err) {
                console.error('Erreur lors de la suppression de l\'avis :', err);
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
                console.error('Erreur lors de la suppression du gestionnaire :', err);
                alert('Erreur lors de la suppression du gestionnaire.');
            }
        }
    };
    const handleAddGround = () => {
        const name = prompt('Entrez le nom du terrain :');
        const location = prompt('Entrez l\'emplacement du terrain :');
        const price = parseFloat(prompt('Entrez le prix du terrain :'));
        const availabilityInput = prompt('Le terrain est-il disponible ? (oui/non)').toLowerCase(); // Demande "oui" ou "non"
        const availability = availabilityInput === 'oui'; // Convertit "oui" en true et tout autre en false
        const description = prompt('Entrez une description pour le terrain :');
        const address = prompt('Entrez l\'adresse du terrain :');
        const image = prompt('Entrez l\'URL de l\'image du terrain :');
    
        if (!name || !location || isNaN(price) || !description || !address) {
            alert('Veuillez remplir tous les champs correctement.');
            return;
        }
    
        const newGround = { name, location, price, availability, description, address, image };
        console.log('Données envoyées pour ajout :', newGround);
    
        api.post('/grounds', newGround)
            .then(() => {
                alert('Terrain ajouté avec succès.');
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    console.error('Erreur lors de l\'ajout du terrain :', err.response.data);
                    if (err.response.data.errors) {
                        alert(`Erreur : ${err.response.data.errors.join(', ')}`);
                    } else {
                        alert(`Erreur : ${err.response.data.message}`);
                    }
                } else {
                    console.error('Erreur lors de l\'ajout du terrain :', err);
                    alert('Erreur lors de l\'ajout du terrain.');
                }
            });
    };
    const handleUpdateGround = () => {
        const groundId = prompt('Entrez l\'ID du terrain à mettre à jour :');
        if (groundId) {
            const name = prompt('Entrez le nouveau nom du terrain :');
            const location = prompt('Entrez le nouvel emplacement du terrain :');
            const price = parseFloat(prompt('Entrez le nouveau prix du terrain :')); // Ajoutez cette ligne
            const availability = confirm('Le terrain est-il disponible ?'); // Ajoutez cette ligne
            const description = prompt('Entrez la nouvelle description du terrain :');
            const address = prompt('Entrez la nouvelle adresse du terrain :');
            const image = prompt('Entrez la nouvelle URL de l\'image du terrain :');
    
            // Vérifiez que tous les champs nécessaires sont remplis
            if (name && location && !isNaN(price) && description && address && image) {
                const updatedGround = { name, location, price, availability, description, address, image };
                api.put(`/grounds/${groundId}`, updatedGround)
                    .then(() => {
                        alert('Terrain mis à jour avec succès.');
                    })
                    .catch((err) => {
                        console.error('Erreur lors de la mise à jour du terrain :', err);
                        alert('Erreur lors de la mise à jour du terrain.');
                    });
            } else {
                alert('Veuillez remplir tous les champs correctement.');
            }
        }
    };
    const handleDeleteGround = () => {
        const groundId = prompt('Entrez l\'ID du terrain à supprimer :');
        if (groundId) {
            api.delete(`/grounds/${groundId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Ajoutez le token ici
                },
            })
                .then(() => {
                    alert('Terrain supprimé avec succès.');
                    window.location.reload(); // Recharge la page pour afficher les modifications
                })
                .catch(err => {
                    if (err.response && err.response.status === 403) {
                        alert('Vous n\'avez pas les autorisations nécessaires pour supprimer ce terrain.');
                    } else {
                        alert('Erreur lors de la suppression du terrain.');
                    }
                    console.error('Erreur lors de la suppression du terrain :', err);
                });
        }
    };

    return (
        <div className="grounds-page">
            <div className="container">
                {/* Barre de recherche */}
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

                {/* Liste des terrains */}
                <div className="terrain-list">
    {displayedGrounds.length > 0 ? (
        displayedGrounds.map((terrain) => (
            <Link key={terrain.id} to={`/ground/${terrain.id}`} className="terrain-item-link">
                <div className="terrain-item">
                    <img
                        src={terrain.image || '/images/default.jpeg'}
                        alt={terrain.name || 'Image indisponible'}
                        className="terrain-image"
                        onError={(e) => {
                            e.target.src = '/images/default.jpeg'; // Remplace par l'image par défaut en cas d'erreur
                        }}
                    />
                    <h3>{terrain.name}</h3>
                    <p>{terrain.description}</p>
                    <p>Adresse : {terrain.address}</p>
                    <p>Prix : {terrain.price} €</p>
                    <button className="terrain-action">Voir plus</button>
                </div>
            </Link>
        ))
    ) : (
        <p>Aucun terrain correspondant à votre recherche.</p>
    )}
</div>

                {/* Pagination */}
                {filteredGrounds.length > itemsPerPage && (
                    <div className="pagination-container">
                        <button
                            className="btn btn-secondary pagination-button"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            <i className="fas fa-chevron-left"></i> Précédent
                        </button>
                        <span className="pagination-info">Page {currentPage} sur {totalPages}</span>
                        <button
                            className="btn btn-secondary pagination-button"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Suivant <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                )}
            </div>

            {/* Actions spécifiques au rôle */}
            {role === 'gestionnaire' && (
               <div className="manager-actions">
                    <h2>Actions pour les gestionnaires</h2>
                    <button className="btn btn-primary" onClick={handleAddGround}>Ajouter un terrain</button>
                    <button className="btn btn-secondary" onClick={handleUpdateGround}>Mettre à jour un terrain</button>
                    <button className="btn btn-danger" onClick={handleDeleteGround}>Supprimer un terrain</button>
                    <Link to="/manager/dashboard" className="btn btn-info">Voir le bilan</Link>
               </div>
             )}

            {role === 'admin' && (
                <div className="admin-actions">
                    <h2>Actions pour les administrateurs</h2>
                    <button className="btn btn-danger" onClick={handleManageUsers}>Gérer les utilisateurs</button>
                    <button className="btn btn-warning" onClick={handleDeleteReview}>Supprimer un avis</button>
                    <button className="btn btn-secondary" onClick={handleManageManager}>Gérer les gestionnaires</button>
                    <Link to="/admin" className="btn btn-primary">Accéder à la page Admin</Link>
                </div>
            )}
        </div>
    );
};

export default GroundsPage;
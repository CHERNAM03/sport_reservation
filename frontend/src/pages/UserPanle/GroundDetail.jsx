import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GroundDetail.css';
import api from '../../api/api';

const GroundDetail = () => {
  const { groundId } = useParams();
  const navigate = useNavigate();
  const [ground, setGround] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');

  // Charger les détails du terrain et les avis
  useEffect(() => {
    const fetchGroundDetail = async () => {
      try {
        const groundResponse = await api.get(`/grounds/${groundId}`);
        setGround(groundResponse.data);

        const reviewsResponse = await api.get(`/avis/${groundId}`);
        setReviews(reviewsResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors de la récupération des données.');
        setLoading(false);
      }
    };

    fetchGroundDetail();
  }, [groundId]);

  // Soumettre un avis
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('authToken'); // Récupérer le token JWT
      await api.post(
        '/avis',
        {
          groundId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token JWT
          },
        }
      );

      setMessage('Avis ajouté avec succès.');
      setRating('');
      setComment('');

      // Recharger les avis après l'ajout
      const updatedReviews = await api.get(`/avis/${groundId}`);
      setReviews(updatedReviews.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout de l\'avis.');
    }
  };

  // Réserver un terrain
     const handleReserve = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    // Validation côté frontend
    if (!date || !time || !duration) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (duration < 30 || duration > 240) {
      setError('La durée doit être comprise entre 30 et 240 minutes.');
      return;
    }
  
    try {
      const userId = localStorage.getItem('userId'); // Récupérer l'ID utilisateur depuis le stockage local
      const token = localStorage.getItem('authToken'); // Récupérer le token JWT
  
      if (!token) {
        setError('Vous devez être connecté pour effectuer une réservation.');
        return;
      }
  
      console.log('Token JWT :', token); // Vérifiez si le token est bien récupéré
  
      const response = await api.post(
        '/reservations',
        { userId, groundId, date, time, duration },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token JWT dans les en-têtes
          },
        }
      );
  
      setMessage(response.data.message);
      setGround({ ...ground, availability: false }); // Mettre à jour la disponibilité localement
    } catch (err) {
      console.error('Erreur lors de la réservation :', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erreur lors de la réservation.');
    }
  };
  const handleClose = () => {
    navigate('/grounds');
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!ground) return <div className="not-found">Terrain introuvable</div>;

  return (
    <div className="ground-detail-page">
      <div className="ground-detail-content">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <div className="ground-header">
          <img
            src={
              ground.image
                ? ground.image.startsWith('http') // Vérifie si c'est une URL absolue
                  ? ground.image // Utilise l'URL absolue
                  : `/images/${ground.image}` // Utilise un chemin relatif pour les images locales
                : '/images/default.jpeg' // Image par défaut si aucune image n'est fournie
            }
            alt={ground.name || 'Image indisponible'}
            className="ground-detail-image"
            onError={(e) => {
              e.target.src = '/images/default.jpeg'; // Remplace par l'image par défaut en cas d'erreur
            }}
          />
          <div className="ground-info">
            <h1>{ground.name}</h1>
            <p className="area-code">{ground.location}</p>
            <p className="price"><strong>Prix :</strong> {ground.price} €</p>
            <p className="availability">
              <strong>Disponibilité :</strong> {ground.availability ? 'OUI' : 'NON'}
            </p>
            <p className="description">{ground.description}</p>
            <p className="address">
              <strong>Adresse :</strong> {ground.address}
            </p>
          </div>
        </div>

        {ground.availability ? (
          <div className="reservation-form">
            <h2>Réserver ce terrain</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleReserve}>
              <div>
                <label>Date :</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
              <button type="submit">Réserver</button>
            </form>
          </div>
        ) : (
          <p style={{ color: 'red' }}>Ce terrain est actuellement indisponible.</p>
        )}

        <div className="reviews-section">
          <h2>Avis</h2>
          {reviews.length === 0 ? (
            <p>Aucun avis pour ce terrain. Soyez le premier à laisser un avis !</p>
          ) : (
            <div className="reviews-list">
              {reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="rating">Note : {review.rating}/5</div>
                  <p className="review-text">{review.comment}</p>
                  <div className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          <h2>Laisser un Avis</h2>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Note (1-5) :</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                required
              />
            </div>
            <div>
              <label>Commentaire :</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroundDetail;
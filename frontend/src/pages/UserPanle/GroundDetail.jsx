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

  // Charger les détails du terrain et les avis
  useEffect(() => {
    const fetchGroundDetail = async () => {
      try {
        const groundResponse = await api.get(`/api/grounds/${groundId}`); // Endpoint pour récupérer les détails d'un terrain
        setGround(groundResponse.data);

        const reviewsResponse = await api.get(`/api/avis/${groundId}`); // Endpoint pour récupérer les avis
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
      await api.post('/avis', {
        groundId,
        rating,
        comment,
      });

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

  const handleClose = () => {
    navigate('/grounds');
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!ground) return <div className="not-found">Terrain introuvable</div>;

  

  /*   useEffect(() => {
        const fetchGroundDetails = async () => {
            try {
                setLoading(true);
                // Simulate API call - replace with your actual API endpoint
                const fetchedGrounds = [
                    { id: 1, name: 'Central Park Football Field', postalCode: '10001', area: 'Manhattan', description: 'A beautiful field in the heart of the city.', image: 'https://picsum.photos/200', address: '123 Park Ave, New York' },
                    { id: 2, name: 'Stade de France Tennis Courts', postalCode: '93200', area: 'Saint-Denis', description: 'Professional tennis courts with excellent facilities.', image: 'https://picsum.photos/200', address: '10 Rue de la Légion d\'Honneur, Saint-Denis' },
                    { id: 3, name: 'Local Arena Basketball', postalCode: '10001', area: 'Manhattan', description: 'Great place for basketball lovers.', image: 'https://picsum.photos/200', address: '456 Main St, New York' },
                    { id: 4, name: 'Suburb Football Field', postalCode: '75001', area: 'Paris 1er', description: 'Quiet football field near a park.', image: '/images/ground4.jpg', address: '789 Rue de Rivoli, Paris 1er'},
        
                    
                    { id: 11, name: 'Central Park Football Field', postalCode: '10001', area: 'Manhattan', description: 'A beautiful field in the heart of the city.', image: 'https://picsum.photos/200/300', address: '123 Park Ave, New York' },
                    { id: 12, name: 'Stade de France Tennis Courts', postalCode: '93200', area: 'Saint-Denis', description: 'Professional tennis courts with excellent facilities.', image: 'https://picsum.photos/200/300', address: '10 Rue de la Légion d\'Honneur, Saint-Denis' },
                    { id: 13, name: 'Local Arena Basketball', postalCode: '10001', area: 'Manhattan', description: 'Great place for basketball lovers.', image: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg', address: '456 Main St, New York' },
                    { id: 14, name: 'Subu rb Football Field', postalCode: '75001', area: 'Paris 1er', description: 'Quiet football field near a park.', image: '/images/ground4.jpg', address: '789 Rue de Rivoli, Paris 1er'},
                ];
                
                const foundGround = fetchedGrounds.find(g => g.id === parseInt(groundId));
                
                if (foundGround) {
                    setGround(foundGround);
                } else {
                    setError('Ground not found');
                }
            } catch (err) {
                setError('Failed to fetch ground details');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGroundDetails();
    }, [groundId]); 

     const handleReviewSubmitted = (newReview) => {
        setReviews([...reviews, newReview]);
    };*/

    return (
        <div className="ground-detail-page">
          <div className="ground-detail-content">
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
            <div className="ground-header">
              <img src={ground.image} alt={ground.name} className="ground-detail-image" />
              <div className="ground-info">
                <h1>{ground.name}</h1>
                <p className="area-code">{ground.area} - {ground.postalCode}</p>
                <p className="description">{ground.description}</p>
                <p className="address">
                  <strong>Adresse :</strong> {ground.address}
                </p>
              </div>
            </div>
    
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
      
    
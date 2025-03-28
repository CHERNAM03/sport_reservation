import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserReviewForm from '../AdminPanel/Users/UserReviewForm';
import './GroundDetail.css';

const GroundDetail = () => {
    const { groundId } = useParams();
    const navigate = useNavigate();
    const [ground, setGround] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    };

    const handleClose = () => {
        navigate('/grounds');
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!ground) return <div className="not-found">Ground not found</div>;

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
                            <strong>Address:</strong> {ground.address}
                        </p>
                    </div>
                </div>

                <div className="reviews-section">
                    <h2>Reviews</h2>
                    {reviews.length === 0 ? (
                        <p>No reviews yet. Be the first to review!</p>
                    ) : (
                        <div className="reviews-list">
                            {reviews.map((review, index) => (
                                <div key={index} className="review-item">
                                    <div className="rating">Rating: {review.rating}/5</div>
                                    <p className="review-text">{review.text}</p>
                                    <div className="review-date">
                                        {new Date(review.date).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <UserReviewForm facilityId={ground.id} onReviewSubmitted={handleReviewSubmitted} />
                </div>
            </div>
        </div>
    );
};

export default GroundDetail;
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FacilityReviews = ({ facilityId }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        // Simulation de la récupération des avis (remplacez par votre appel API)
        const fetchedReviews = [
            { id: 1, facilityId: facilityId, rating: 4, text: 'Bonnes installations.', date: '2023-11-15' },
            { id: 2, facilityId: facilityId, rating: 5, text: 'Excellent service.', date: '2023-11-16' },
            { id: 3, facilityId: facilityId, rating: 3, text: 'Installations correctes.', date: '2023-11-17' },
        ];

        setReviews(fetchedReviews);

        // Calcul de la note moyenne
        if (fetchedReviews.length > 0) {
            const totalRating = fetchedReviews.reduce((sum, review) => sum + review.rating, 0);
            setAverageRating(totalRating / fetchedReviews.length);
        }
    }, [facilityId]);

    return (
        <div className="p-4">
            <h2>Avis des Utilisateurs</h2>
            <div className="mb-3">
                <strong>Note Moyenne :</strong> {averageRating.toFixed(1)}
                <Star className="text-warning" />
            </div>
            {reviews.map((review) => (
                <div key={review.id} className="card mb-3">
                    <div className="card-body">
                        <div className="mb-2">
                            {[1, 2, 3, 4, 5].map((starRating) => (
                                <Star
                                    key={starRating}
                                    className={starRating <= review.rating ? 'text-warning' : 'text-muted'}
                                />
                            ))}
                        </div>
                        <p className="card-text">{review.text}</p>
                        <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FacilityReviews;
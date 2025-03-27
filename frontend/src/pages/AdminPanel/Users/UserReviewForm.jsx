import React, { useState } from 'react';
import { Star } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserReviewForm = ({ facilityId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleSubmitReview = () => {
        // Validation (ajoutez une validation plus robuste si nécessaire)
        if (rating === 0 || !reviewText) {
            alert('Veuillez donner une note et écrire un avis.');
            return;
        }

        // Simulation de la soumission de l'avis (remplacez par votre appel API)
        const review = {
            facilityId: facilityId,
            rating: rating,
            text: reviewText,
            date: new Date().toISOString(),
        };

        // Appel de la fonction onReviewSubmitted pour mettre à jour l'état du composant parent
        onReviewSubmitted(review);

        // Réinitialisation du formulaire
        setRating(0);
        setReviewText('');
    };

    return (
        <div className="p-4">
            <h2>Écrire un Avis</h2>
            <div className="mb-3">
                <label className="form-label">Note</label>
                <div className="d-flex">
                    {[1, 2, 3, 4, 5].map((starRating) => (
                        <button
                            key={starRating}
                            className={`btn ${starRating <= rating ? 'btn-warning' : 'btn-outline-warning'} me-2`}
                            onClick={() => handleRatingChange(starRating)}
                        >
                            <Star />
                        </button>
                    ))}
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Avis</label>
                <textarea
                    className="form-control"
                    value={reviewText}
                    onChange={handleReviewTextChange}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSubmitReview}>
                Soumettre l'Avis
            </button>
        </div>
    );
};

export default UserReviewForm;
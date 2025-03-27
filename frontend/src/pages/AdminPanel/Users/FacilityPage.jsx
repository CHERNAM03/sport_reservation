import React from 'react';
import UserReviewForm from './UserReviewForm';
import FacilityReviews from './FacilityReviews';

const FacilityPage = ({ facilityId }) => {
    const handleReviewSubmitted = (newReview) => {
        // Logique pour ajouter le nouvel avis à la liste des avis
        console.log('Nouvel avis soumis :', newReview);
    };

    return (
        <div>
            <h1>Détails de l'Installation</h1>
            {/* ... Autres détails de l'installation ... */}
            <FacilityReviews facilityId={facilityId} />
            <UserReviewForm facilityId={facilityId} onReviewSubmitted={handleReviewSubmitted} />
        </div>
    );
};

export default FacilityPage;
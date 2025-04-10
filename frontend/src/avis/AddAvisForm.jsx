
import React, { useState } from 'react';
import api from '../api/api';
import './AddAvisForm.css'; // Import custom CSS

const AddAvisForm = ({ groundId }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    if (rating < 1 || rating > 5) {
      setError('La note doit être comprise entre 1 et 5.');
      setIsSubmitting(false);
      return;
    }
    const response = await api.post('/avis', {
        groundId,
        rating,
        comment
      });
    try { if (response.status !== 201) {
        throw new Error('Erreur lors de l\'ajout de l\'avis.');
    }
      

      setMessage('Avis ajouté avec succès.');
      setRating('');
      setComment('');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur inattendue est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Laisser un Avis</h3>
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
};

export default AddAvisForm;
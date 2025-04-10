import React, { useEffect, useState } from 'react';
import api from '../api/api';
import './AvisList.css'; // Import custom CSS

const AvisList = ({ groundId }) => {
  const [avis, setAvis] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const response = await api.get(`/avis/${groundId}`);
        setAvis(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors de la récupération des avis.');
      }
    };

    fetchAvis();
  }, [groundId]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h3>Avis pour le Terrain</h3>
      {avis.length === 0 ? (
        <p>Aucun avis pour ce terrain.</p>
      ) : (
        <ul>
          {avis.map((a) => (
            <li key={a.id}>
              <strong>Note :</strong> {a.rating} <br />
              <strong>Commentaire :</strong> {a.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvisList;
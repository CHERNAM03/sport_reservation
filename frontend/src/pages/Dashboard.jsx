import React, { useEffect, useState } from 'react';
import { getAvailableGrounds, reserveGround } from '../services/reservationService';
import { createGround, getAllGrounds } from '../services/groundService';

const Dashboard = () => {
  const [grounds, setGrounds] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // Récupérez les infos utilisateur

  useEffect(() => {
    if (user.role === 'gestionnaire') {
      // Récupérer tous les terrains pour le gestionnaire
      getAllGrounds().then(setGrounds).catch(console.error);
    } else if (user.role === 'user') {
      // Récupérer les terrains disponibles pour l'utilisateur
      getAvailableGrounds().then(setGrounds).catch(console.error);
    }
  }, [user.role]);

  const handleCreateGround = async () => {
    const newGround = {
      name: 'Terrain C',
      location: 'Dakar',
      price: 200,
      availability: true,
    };
    try {
      const createdGround = await createGround(newGround);
      setGrounds([...grounds, createdGround]);
    } catch (error) {
      console.error('Erreur lors de la création du terrain :', error);
    }
  };

  const handleReserveGround = async (groundId) => {
    const reservationData = {
      userId: user.id,
      groundId,
      date: '2025-04-10',
      time: '15:00',
    };
    try {
      const reservation = await reserveGround(reservationData);
      console.log('Réservation réussie :', reservation);
    } catch (error) {
      console.error('Erreur lors de la réservation :', error);
    }
  };

  return (
    <div>
      <h1>Bienvenue, {user.username}</h1>
      {user.role === 'gestionnaire' && (
        <button onClick={handleCreateGround}>Créer un terrain</button>
      )}
      <ul>
        {grounds.map((ground) => (
          <li key={ground.id}>
            {ground.name} - {ground.location} - {ground.price}€
            {user.role === 'user' && ground.availability && (
              <button onClick={() => handleReserveGround(ground.id)}>Réserver</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
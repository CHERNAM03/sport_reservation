import api from '../api/api';

// Récupérer les terrains disponibles
export const getAvailableGrounds = async () => {
  const response = await api.get('/ground/available');
  return response.data;
};

// Réserver un terrain
export const reserveGround = async (reservationData) => {
  const response = await api.post('/reservations', reservationData);
  return response.data;
};
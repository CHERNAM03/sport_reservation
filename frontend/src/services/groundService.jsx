import api from '../api/api'; // Assurez-vous que le chemin est correct

// Créer un terrain
export const createGround = async (groundData) => {
  const response = await api.post('/ground', groundData);
  return response.data;
};

// Récupérer tous les terrains
export const getAllGrounds = async () => {
  const response = await api.get('/ground');
  return response.data;
};

// Mettre à jour un terrain
export const updateGround = async (id, groundData) => {
  const response = await api.put(`/ground/${id}`, groundData);
  return response.data;
};

// Supprimer un terrain
export const deleteGround = async (id) => {
  const response = await api.delete(`/ground/${id}`);
  return response.data;
};
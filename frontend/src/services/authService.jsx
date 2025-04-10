import api from '../api/api';

// Connexion de l'utilisateur
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token); // Stockez le jeton JWT
  localStorage.setItem('user', JSON.stringify(response.data.user)); // Stockez les infos utilisateur
  return response.data;
};

// Déconnexion de l'utilisateur
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
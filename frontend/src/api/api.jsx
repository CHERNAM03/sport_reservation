import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL de votre backend
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Inclure le jeton JWT dans les en-têtes
  },
});

// Ajoutez un intercepteur pour inclure le jeton JWT dans les en-têtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Récupérez le jeton JWT depuis le localStorage
  console.log('Token:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
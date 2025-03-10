import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSports = async () => {
  try {
    const response = await api.get('/sports');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reserveSport = async (reservationData) => {
  try {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more API functions as needed
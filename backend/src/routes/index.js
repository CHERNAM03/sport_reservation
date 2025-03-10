const express = require('express');
const router = express.Router();

// Import controller functions
const { getAllReservations, createReservation, updateReservation, deleteReservation } = require('../controllers');

// Define routes
router.get('/reservations', getAllReservations);
router.post('/reservations', createReservation);
router.put('/reservations/:id', updateReservation);
router.delete('/reservations/:id', deleteReservation);

module.exports = router;
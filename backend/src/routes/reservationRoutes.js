const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const reservationController = require('../controllers/reservationController');

// Réserver un terrain (accessible uniquement aux utilisateurs)
router.post('/', authenticateToken, authorizeRoles(['user']), reservationController.reserveTerrain);

module.exports = router;
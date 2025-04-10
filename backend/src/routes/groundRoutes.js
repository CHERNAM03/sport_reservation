const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const groundController = require('../controllers/groundController');
const reservationController = require('../controllers/reservationController');


// Gestionnaire : CRUD sur les terrains
router.post('/', authenticateToken, authorizeRoles(['gestionnaire']), groundController.createTerrain);
// router.get('/', authenticateToken, authorizeRoles(['user']), groundController.getAllTerrains);
router.get('/', groundController.getAllTerrains);
router.get('/:id', authenticateToken, authorizeRoles(['gestionnaire']), groundController.getTerrainById);
router.put('/:id', authenticateToken, authorizeRoles(['gestionnaire']), groundController.updateTerrain);
router.delete('/:id', authenticateToken, authorizeRoles(['gestionnaire']), groundController.deleteTerrain);

// Utilisateur : Consulter les terrains disponibles
router.get('/available', authenticateToken, authorizeRoles(['user']), groundController.getAvailableTerrains);

// Utilisateur : Réserver un terrain
router.post('/reserve', authenticateToken, authorizeRoles(['user']), reservationController.reserveTerrain);

module.exports = router;
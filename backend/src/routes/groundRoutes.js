const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const groundController = require('../controllers/groundController');
const reservationController = require('../controllers/reservationController');
const { body } = require('express-validator');

// Gestionnaire : CRUD sur les terrains
router.post(
  '/',
  authenticateToken,
  authorizeRoles(['gestionnaire']),
  [
    body('name').notEmpty().withMessage('Le nom est requis.'),
    body('location').notEmpty().withMessage('L\'emplacement est requis.'),
    body('price').isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif.'),
  ],
  groundController.createTerrain
);

router.get('/', groundController.getAllTerrains);
router.get('/:id', groundController.getTerrainById);
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles(['gestionnaire']),
  [
    body('name').optional().notEmpty().withMessage('Le nom ne peut pas être vide.'),
    body('location').optional().notEmpty().withMessage('L\'emplacement ne peut pas être vide.'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif.'),
  ],
  groundController.updateTerrain
);
router.delete('/:id', authenticateToken, authorizeRoles(['gestionnaire']), groundController.deleteTerrain);

// Utilisateur : Consulter les terrains disponibles
router.get('/available', authenticateToken, authorizeRoles(['user']), groundController.getAvailableTerrains);

// Utilisateur : Réserver un terrain
router.post('/reserve', authenticateToken, authorizeRoles(['user']), reservationController.reserveTerrain);

module.exports = router;
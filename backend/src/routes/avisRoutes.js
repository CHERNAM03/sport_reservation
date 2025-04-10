const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const avisController = require('../controllers/avisController');

// Ajouter un avis
router.post('/', authenticateToken, avisController.addAvis);

// Récupérer tous les avis
router.get('/', avisController.getAllAvis);

// Récupérer les avis pour un terrain spécifique
router.get('/ground/:groundId', avisController.getAvisByGround);

module.exports = router;
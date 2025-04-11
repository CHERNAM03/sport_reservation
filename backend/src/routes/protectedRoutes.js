const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/authMiddleware');

// Route accessible uniquement aux administrateurs
router.get('/admin', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  res.json({ message: 'Bienvenue, administrateur !' });
});

// Route accessible uniquement aux gestionnaires
router.get('/gestionnaire', authenticateToken, authorizeRoles(['gestionnaire']), (req, res) => {
  res.json({ message: 'Bienvenue, gestionnaire !' });
});

// Route accessible uniquement aux utilisateurs
router.get('/user',authenticateToken, authorizeRoles(['user']), (req, res) => {
  res.json({ message: 'Bienvenue, utilisateur !' });
});

// Route accessible à tous les rôles
router.get('/all', authenticateToken, (req, res) => {
  res.json({ message: `Bienvenue, ${req.user.role} !` });
});

module.exports = router;
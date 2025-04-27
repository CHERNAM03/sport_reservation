const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware'); // Importez le middleware correctement

// Route de test
router.get('/test-auth', authenticateToken, (req, res) => {
  res.json({ 
    message: 'Authentification réussie', 
    user: {
      id: req.user.id,
      role: req.user.role,
      tokenDecodedInfo: req.user
    }
  });
});

module.exports = router;
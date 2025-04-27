
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {  authenticateToken } = require('../middlewares/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/create-admin', authController.createAdmin);

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
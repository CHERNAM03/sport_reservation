/* const express = require('express');
const router = express.Router();
const User = require('../models/UsersModel'); // Assurez-vous que le chemin est correct
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route publique temporaire pour créer un administrateur (à supprimer après utilisation)
router.post('/create-admin', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Vérifiez si un administrateur existe déjà
      const existingAdmin = await User.findOne({ where: { role: 'admin' } });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Un administrateur existe déjà.' });
      }
  
      // Hachez le mot de passe
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Créez l'utilisateur administrateur
      const admin = await User.create({
        username,
        email,
        password: hashedPassword,
        role: 'admin'
      });
  
     // Générer un jeton JWT
    const token = jwt.sign(
        { id: admin.id, role: admin.role },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '24h' }
      );
  
      res.status(201).json({
        message: 'Administrateur créé avec succès.',
        admin,
        token // Inclure le jeton dans la réponse
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'administrateur :', error);
      res.status(500).json({ message: 'Une erreur est survenue.' });
    }
  });
// Route pour créer un utilisateur avec un rôle spécifique (accessible uniquement aux administrateurs)
router.post('/create-user', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Vérifiez si le rôle est valide
    const validRoles = ['admin', 'gestionnaire', 'user'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide.' });
    }
    
    // Hachez le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créez l'utilisateur
    const newUser = await User.create({ username, email, password, role });
    res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
});

module.exports = router; */
const express = require('express');
const router = express.Router();
const User = require('../models/UsersModel'); 
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route publique temporaire pour créer un administrateur (à supprimer après utilisation)
 router.post('/create-admin', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingAdmin = await User.findOne({ where: { role: 'admin' } });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Un administrateur existe déjà.' });
      }
      
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      }

      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà utilisé.' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const admin = await User.create({
        username,
        email,
        password: hashedPassword,
        role: 'admin'
      });
  
      const token = jwt.sign(
        { id: admin.id, role: admin.role },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '24h' }
      );
  
      res.status(201).json({
        message: 'Administrateur créé avec succès.',
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        },
        token
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'administrateur :', error);
      res.status(500).json({ message: 'Une erreur est survenue.', error: error.message });
    }
});
 
// Route pour créer un utilisateur avec un rôle spécifique (accessible uniquement aux administrateurs)
router.post('/create-user', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const validRoles = ['admin', 'gestionnaire', 'user'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide.' });
    }
    
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà utilisé.' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ 
      username, 
      email, 
      password: hashedPassword, 
      role 
    });
    
    res.status(201).json({ 
      message: 'Utilisateur créé avec succès.', 
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ message: 'Une erreur est survenue.', error: error.message });
  }
});

// Route pour récupérer un utilisateur par ID (accessible uniquement aux administrateurs)
router.get('/:id', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'role', 'createdAt']
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
  }
});
router.get('/', async (req, res) => {
  try {
      const users = await User.findAll(); // Sequelize pour récupérer tous les utilisateurs
      res.status(200).json(users);
  } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
});

// Route pour supprimer un utilisateur (accessible uniquement aux administrateurs)
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);

      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      await user.destroy();
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur serveur' });
  }
});
 
module.exports = router;
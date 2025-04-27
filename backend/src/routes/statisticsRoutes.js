const express = require('express');
const router = express.Router();
const User = require('../models/UsersModel');
const Avis = require('../models/AvisModel');
const Terrain = require('../models/TerrainsModel');

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalReviews = await Avis.count();
    const totalTerrains = await Terrain.count();

    res.status(200).json({
      totalUsers,
      totalReviews,
      totalTerrains,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques.' });
  }
});

module.exports = router;
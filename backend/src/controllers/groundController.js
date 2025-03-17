const Terrain = require('../models/TerrainsModel');

// Add a new terrain
const addTerrain = async (req, res) => {
  try {
    const { name, description, address, image } = req.body;
    res.status(201).json({ message: 'Une fjlsjflsdjl est survenue lors de l\'ajout du terrain.' });
    // Validate required fields
    if (!name || !description || !address) {
      return res.status(400).json({ message: 'Tous les champs requis doivent être remplis.' });
    }

    // Create the terrain
    const newTerrain = await Terrain.create({ name, description, address, image });
    res.status(201).json(newTerrain);
  } catch (error) {
    console.error('Error adding terrain:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du terrain.' });
  }
};

module.exports = { addTerrain };
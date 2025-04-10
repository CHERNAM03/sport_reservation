const Terrain = require('../models/TerrainsModel');


// Créer un nouveau terrain
exports.createTerrain = async (req, res) => {
  try {
    const terrain = await Terrain.create(req.body);
    res.status(201).json(terrain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer tous les terrains
exports.getAllTerrains = async (req, res) => {
  try {
    const terrains = await Terrain.findAll();
    res.json(terrains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un terrain par ID
exports.getTerrainById = async (req, res) => {
  try {
    const terrain = await Terrain.findByPk(req.params.id);
    if (terrain) {
      res.json(terrain);
    } else {
      res.status(404).json({ message: 'Terrain non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un terrain
exports.updateTerrain = async (req, res) => {
  try {
    const [updated] = await Terrain.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTerrain = await Terrain.findByPk(req.params.id);
      res.json(updatedTerrain);
    } else {
      res.status(404).json({ message: 'Terrain non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un terrain
exports.deleteTerrain = async (req, res) => {
  try {
    const deleted = await Terrain.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ message: 'Terrain non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Récupérer les terrains disponibles
exports.getAvailableTerrains = async (req, res) => {
  try {
    const terrains = await Terrain.findAll({ where: { availability: true } });
    res.json(terrains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
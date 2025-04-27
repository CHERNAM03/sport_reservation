const Terrain = require('../models/TerrainsModel');


// Créer un nouveau terrain
exports.createTerrain = async (req, res) => {
  try {
    console.log('Données reçues pour la création du terrain :', req.body); // Log des données reçues
    const terrain = await Terrain.create(req.body);
    res.status(201).json(terrain);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: messages });
    }
    console.error('Erreur lors de la création du terrain :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer tous les terrains
exports.getAllTerrains = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const terrains = await Terrain.findAll(); // Assurez-vous que `Terrain.findAll()` retourne un tableau
    res.status(200).json(terrains);
} catch (error) {
    console.error('Erreur lors de la récupération des terrains :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des terrains.' });
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
    // Vérifiez si le champ price est valide
    if (req.body.price !== undefined) {
      if (isNaN(req.body.price) || req.body.price <= 0) {
        return res.status(400).json({ message: 'Le prix doit être un nombre valide supérieur à 0.' });
      }
    }

    // Mettez à jour le terrain
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
    console.error('Erreur lors de la mise à jour du terrain :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du terrain.' });
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
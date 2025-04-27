const Avis = require('../models/AvisModel');
const Terrain = require('../models/TerrainsModel');
const Reservation = require('../models/ReservationModel');

// Ajouter un avis

exports.addAvis = async (req, res) => {
    try {
      const { groundId, rating, comment } = req.body;
      const userId = req.user.id; // Récupérer l'ID de l'utilisateur connecté depuis le token
  
      if (!groundId || !rating || !comment) {
        return res.status(400).json({ message: 'Tous les champs (groundId, rating, comment) sont requis.' });
      }
      // Vérifiez si l'utilisateur a réservé ce terrain
      const reservation = await Reservation.findOne({
        where: { userId, groundId }
      });
  
      if (!reservation) {
        return res.status(403).json({ message: 'Vous ne pouvez laisser un avis que pour un terrain que vous avez réservé.' });
      }
  
      // Créez l'avis
      const avis = await Avis.create({ userId, groundId, rating, comment });
      res.status(201).json({ message: 'Avis ajouté avec succès.', avis });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'avis.', error: error.message });
    }
  };
// Récupérer tous les avis
exports.getAllAvis = async (req, res) => {
  try {
    const avis = await Avis.findAll();
    res.status(200).json(avis);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des avis.', error: error.message });
  }
};

// Récupérer les avis pour un terrain spécifique
exports.getAvisByGround = async (req, res) => {
  try {
    const { groundId } = req.params;
    const avis = await Avis.findAll({ where: { groundId } });
    res.status(200).json(avis);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des avis.', error: error.message });
  }
};

// avisController.js
exports.deleteAvis = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Tentative de suppression de l'avis ${id}`);
    
    const avis = await Avis.findByPk(id);
    if (!avis) {
      return res.status(404).json({ message: 'Avis non trouvé' });
    }
    
    await avis.destroy();
    return res.json({ message: 'Avis supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'avis:', error);
    return res.status(500).json({ message: error.message });
  }
};
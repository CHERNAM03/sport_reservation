const Reservation = require('../models/ReservationModel');
const Terrain = require('../models/TerrainsModel');
const User = require('../models/UsersModel'); 

// Réserver un terrain
exports.reserveTerrain = async (req, res) => {
  try {
    const { userId, groundId, date, time, duration } = req.body;

     // Vérifiez si l'utilisateur existe
     const user = await User.findByPk(userId);
     if (!user) {
       return res.status(404).json({ message: 'Utilisateur non trouvé.' });
     }
 
     // Vérifiez si l'utilisateur a le rôle "user"
     if (user.role !== 'user') {
       return res.status(403).json({ message: 'Seuls les utilisateurs avec le rôle "user" peuvent réserver un terrain.' });
     }

    // Vérifiez si le terrain existe
    const terrain = await Terrain.findByPk(groundId);
    if (!terrain) {
      return res.status(404).json({ message: 'Terrain non trouvé.' });
    }

    // Vérifiez si la durée est valide
    if (!duration || duration < 30 || duration > 240) {
      return res.status(400).json({ message: 'La durée doit être comprise entre 30 et 240 minutes.' });
    }

    // Vérifiez si le terrain est disponible pour cette date et heure
    const existingReservation = await Reservation.findOne({
      where: { groundId, date, time }
    });
    if (existingReservation) {
      return res.status(400).json({ message: 'Ce terrain est déjà réservé pour cette date et heure.' });
    }

    // Créez la réservation
    const reservation = await Reservation.create({
      userId,
      groundId,
      date,
      time,
      duration, // Inclure la durée
      status: 'pending' // Statut par défaut
    });

    // Récupérez la réservation complète avec tous les champs
   const fullReservation = await Reservation.findByPk(reservation.id);

    res.status(201).json({
      message: 'Réservation effectuée avec succès.',
      reservation
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la réservation.', error: error.message });
  }
};
const sequelize = require('../config/database');
const { Op } = require('sequelize');
const Reservation = require('../models/ReservationModel');
const Terrain = require('../models/TerrainsModel');
const User = require('../models/UsersModel');
//const { io } = require('../app'); // Assurez-vous que le chemin est correct
const socketManager = require('../socketManager'); // Assurez-vous que le chemin est correct

// Réserver un terrain
exports.reserveTerrain = async (req, res) => {
  try {
    const { userId, groundId, date, time, duration } = req.body;

    // Vérifiez que la date est aujourd'hui ou dans le futur
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      return res.status(400).json({ message: 'La date doit être aujourd\'hui ou dans le futur.' });
    }

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

    // Convertir date et heure en objets Date JavaScript
    const startDateTime = new Date(`${date}T${time}`);
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

    // Récupérer toutes les réservations pour ce terrain à cette date
    const reservationsForDay = await Reservation.findAll({
      where: {
        groundId,
        date
      }
    });

    // Vérifier manuellement si une réservation existante chevauche la nouvelle
    let isOverlapping = false;
    for (const existingReservation of reservationsForDay) {
      // Calculer le début et la fin de la réservation existante
      const existingStartTime = new Date(`${existingReservation.date}T${existingReservation.time}`);
      const existingEndTime = new Date(existingStartTime.getTime() + existingReservation.duration * 60000);

      // Vérifier le chevauchement
      if (
        (startDateTime < existingEndTime && endDateTime > existingStartTime) ||
        (existingStartTime < endDateTime && existingEndTime > startDateTime)
      ) {
        isOverlapping = true;
        break;
      }
    }

    if (isOverlapping) {
      return res.status(400).json({ message: 'Ce terrain est déjà réservé pour cette période.' });
    }

    // Créez la réservation
    const reservation = await Reservation.create({
      userId,
      groundId,
      date,
      time,
      duration,
      status: 'pending',
    });

    // Calculez les nouvelles statistiques
    const addedGrounds = await Terrain.count(); // Nombre total de terrains
    const availableGrounds = await Terrain.count({ where: { availability: true } }); // Terrains disponibles
    const averagePrice = await Terrain.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('price')), 'averagePrice']],
      raw: true,
    });

    const newAveragePrice = averagePrice[0].averagePrice || 0;

    // Émettez un événement WebSocket pour mettre à jour les statistiques
    try {
      const io = socketManager.getIO();
      io.emit('reservationUpdated', {
        addedGrounds,
        availableGrounds,
        averagePrice: newAveragePrice,
      });
      console.log('Événement socket émis: reservationUpdated', { 
        addedGrounds, 
        availableGrounds, 
        averagePrice: newAveragePrice 
      });
    } catch (socketError) {
      console.error('Erreur lors de l\'émission du socket:', socketError);
    }

    res.status(201).json({
      message: 'Réservation effectuée avec succès.',
      reservation,
    });
  } catch (error) {
    console.error('Erreur lors de la réservation :', error);
    res.status(500).json({ message: 'Erreur lors de la réservation.', error: error.message });
  }
};
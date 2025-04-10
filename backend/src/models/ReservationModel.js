const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./UsersModel');
const Terrain = require('./TerrainsModel');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  groundId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Terrain,
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true, // Vérifie que la valeur est une date valide
      isAfter: new Date().toISOString().split('T')[0] // La date doit être dans le futur
    }
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER, // Durée en minutes
    allowNull: false,
    validate: {
      min: 30, // Minimum 30 minutes
      max: 240 // Maximum 4 heures
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async (reservation, options) => {
      // Vérifiez si le terrain est déjà réservé à la même date et heure
      const existingReservation = await Reservation.findOne({
        where: {
          groundId: reservation.groundId,
          date: reservation.date,
          time: reservation.time
        }
      });

      if (existingReservation) {
        throw new Error('Le terrain est déjà réservé à cette date et heure.');
      }
    }
  }
});

module.exports = Reservation;
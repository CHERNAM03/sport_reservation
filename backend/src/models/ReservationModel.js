const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./UsersModel');
const Terrain = require('./TerrainsModel');

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  groundId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Terrain,
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      isFuture(value) {
        const today = new Date().toISOString().split('T')[0];
        if (value < today) {
          throw new Error('La date de réservation doit être dans le futur.');
        }
      }
    },
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, // Durée en minutes
    allowNull: false,
    validate: {
      min: 30, // Minimum 30 minutes
      max: 240, // Maximum 4 heures
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (reservation, options) => {
      const startTime = new Date(`${reservation.date}T${reservation.time}`);
      const endTime = new Date(startTime.getTime() + reservation.duration * 60000);

      // Vérifiez si le terrain est déjà réservé pour cette période
      const overlappingReservation = await Reservation.findOne({
        where: {
          groundId: reservation.groundId,
          date: reservation.date,
          [Op.or]: [
            {
              time: {
                [Op.between]: [
                  reservation.time,
                  endTime.toISOString().split('T')[1],
                ],
              },
            },
            {
              [Op.and]: [
                { time: { [Op.lte]: reservation.time } },
                sequelize.literal(`ADDTIME(time, SEC_TO_TIME(duration * 60)) >= '${endTime.toISOString().split('T')[1]}'`),
              ],
            },
          ],
        },
      });

      if (overlappingReservation) {
        throw new Error('Le terrain est déjà réservé pour cette période.');
      }
    },
  },
});

module.exports = Reservation;
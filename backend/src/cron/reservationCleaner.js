const cron = require('node-cron');
const { Op } = require('sequelize');
const Reservation = require('../models/ReservationModel');

const cleanExpiredReservations = () => {
  cron.schedule('*/5 * * * *', async () => {
    const now = new Date();

    try {
      // Trouvez les réservations expirées
      const expiredReservations = await Reservation.findAll({
        where: {
          status: 'pending',
          date: { [Op.lt]: now.toISOString().split('T')[0] },
          time: { [Op.lt]: now.toISOString().split('T')[1] },
        },
      });

      for (const reservation of expiredReservations) {
        reservation.status = 'cancelled';
        await reservation.save();
      }

      console.log('Réservations expirées nettoyées.');
    } catch (error) {
      console.error('Erreur lors du nettoyage des réservations expirées :', error.message);
    }
  });
};

module.exports = cleanExpiredReservations;
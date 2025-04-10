const database = require('../config/database');

// Importer les modèles
const User = require('./UsersModel');
const Terrain = require('./TerrainsModel');
const Reservation = require('./ReservationModel');
const Avis = require('./AvisModel');

// Définir les relations entre les modèles (tables)

// Relation entre User et Reservation
User.hasMany(Reservation, { foreignKey: 'userId', onDelete: 'CASCADE' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

// Relation entre User et Avis
User.hasMany(Avis, { foreignKey: 'userId', onDelete: 'CASCADE' });
Avis.belongsTo(User, { foreignKey: 'userId' });

// Relation entre Terrain et Reservation
Terrain.hasMany(Reservation, { foreignKey: 'groundId', onDelete: 'CASCADE' });
Reservation.belongsTo(Terrain, { foreignKey: 'groundId' });

// Relation entre Terrain et Avis
Terrain.hasMany(Avis, { foreignKey: 'groundId', onDelete: 'CASCADE' });
Avis.belongsTo(Terrain, { foreignKey: 'groundId' });

// Exporter les modèles et la base de données
module.exports = {
    database,
    User,
    Reservation,
    Terrain,
    Avis
};
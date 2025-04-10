const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./UsersModel'); // Assurez-vous que le chemin est correct
const Terrain = require('./TerrainsModel'); // Assurez-vous que le chemin est correct

const Avis = sequelize.define('Avis', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Référence au modèle User
      key: 'id'
    }
  },
  groundId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Peut être null si l'avis n'est pas lié à un terrain spécifique
    references: {
      model: Terrain, // Référence au modèle Terrain
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5 // Note entre 1 et 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true // Le commentaire est optionnel
  }
});

module.exports = Avis;



const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const Terrain = sequelize.define('Terrain', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Name is required
    validate: {
      notEmpty: { msg: 'Le nom du terrain est requis.' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false, // Description is required
    validate: {
      notEmpty: { msg: 'La description est requise.' }
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false, // Address is required
    validate: {
      notEmpty: { msg: 'L\'adresse est requise.' }
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true, // Image URL is optional
    validate: {
      isUrl: { msg: 'L\'URL de l\'image doit être valide.' }
    }
  }
}, {
  tableName: 'terrains', // Table name in the database
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = Terrain;
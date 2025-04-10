const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance

const Terrain = sequelize.define('Terrain', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Name is required
    validate: {
      notEmpty: { msg: 'Le nom du terrain est requis.' }
    }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false // Location is required
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false // Price is required
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true // Default availability is true
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
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'gestionnaire', 'user'), // Définir les rôles possibles
    defaultValue: 'user' // Par défaut, un utilisateur est un "user"
  }
 
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Add instance method for password validation
User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Add instance method to generate JWT
User.prototype.generateAuthToken = function() {
  const payload = {
    id: this.id,
    username: this.username,
    email: this.email,
    role: this.role
  };

  // Générer un token avec une clé secrète
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret_key', {
    expiresIn: '24h' // Durée de validité du token
  });

  return token;
};


module.exports = User;
// This file defines the data models for the application, including the schema for the MySQL database.

const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

const Reservation = sequelize.define('Reservation', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    sport: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false
    }
});

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Reservation
};
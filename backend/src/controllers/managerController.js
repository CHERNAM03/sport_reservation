const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');
const db = require('../config/database');
const Terrain = require('../models/TerrainsModel');

exports.getManagerStats = async (req, res) => {
    try {
        // Exemple de statistiques
        const addedGrounds = await Terrain.count(); // Nombre total de terrains
        const availableGrounds = await Terrain.count({ where: { availability: true } });
        const averagePrice = await Terrain.findAll({
            // Remplacez sequelize par Sequelize (avec un S majuscule)
            attributes: [[Sequelize.fn('AVG', Sequelize.col('price')), 'averagePrice']],
            raw: true,
        });

        res.json({
            addedGrounds,
            availableGrounds,
            averagePrice: averagePrice[0]?.averagePrice || 0,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error.message, error.stack);
        res.status(500).json({ 
            message: 'Erreur lors de la récupération des statistiques.', 
            error: error.message 
        });
    }
};
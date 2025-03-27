const express = require('express');
const router = express.Router();
const {  addTerrain } = require('../controllers/groundController');



// Route to add a new terrain
router.post('/addGround', addTerrain);

module.exports = router;

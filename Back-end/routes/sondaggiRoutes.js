const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Model
const Sondaggio = require('../models/sondaggio.model');

// Controllers
const { getSondaggi, creaSondaggio } = require('../controllers/sondaggioController');

// Middleware
const { checkRole, usingToken, checkServiceId } = require('../middleware/authMiddleware');

// Restitusce un sondaggio compilabile
router.get('/', checkServiceId, usingToken, checkRole(['gds', 'utente']), async (req, res) => {
  getSondaggi(req, res);
});

// Crea un sondaggio
router.post('/', checkServiceId, usingToken, checkRole(['gds']), async (req, res) => {
  creaSondaggio(req, res);
});

module.exports = router;
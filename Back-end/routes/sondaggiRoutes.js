const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Model
const Sondaggio = require('../models/sondaggio.model');

// Controllers
const { getSondaggi, creaSondaggio, getSondaggioById } = require('../controllers/sondaggioController');
const { getFeedback, compilaSondaggio } = require('../controllers/feedbackController');

// Middleware
const { checkRole, usingToken, checkServiceId } = require('../middleware/authMiddleware');

// Restitusce i sondaggi compilabili del servizio
router.get('/', checkServiceId, usingToken, checkRole(['gds', 'utente']), async (req, res) => {
  getSondaggi(req, res);
});

// Crea un sondaggio
router.post('/', checkServiceId, usingToken, checkRole(['gds']), async (req, res) => {
  creaSondaggio(req, res);
});

// Restituisce un sondaggio
router.get('/:sondaggio_id', checkServiceId, usingToken, checkRole(['gds']), async (req, res) => {
  getSondaggioById(req, res);
});

// Compila un sondaggio
router.post('/:sondaggio_id', checkServiceId, usingToken, checkRole(['utente']), async (req, res) => {
  compilaSondaggio(req, res);
});

// Risultati di un sondaggio
router.get('/:sondaggio_id/risultati', checkServiceId, usingToken, checkRole(['gds']), async (req, res) => {
  getFeedback(req, res);
});

module.exports = router;
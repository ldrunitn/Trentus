const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Model
const Sondaggio = require('../models/sondaggio.model');

// Controllers
const { getSondaggi, creaSondaggio, getSondaggioById } = require('../controllers/sondaggioController');
const { getFeedback, creaFeedback } = require('../controllers/feedbackController');

// Middleware
const { checkRuolo, usaToken, checkServizioId, CheckDirittiServizio } = require('../middleware/authMiddleware');

// Restitusce i sondaggi compilabili del servizio
router.get('/', checkServizioId, usaToken, checkRuolo(['gds', 'utente']), async (req, res) => {
  getSondaggi(req, res);
});

// Crea un sondaggio
router.post('/', checkServizioId, usaToken, checkRuolo(['gds']), CheckDirittiServizio, async (req, res) => {
  creaSondaggio(req, res);
});

// Restituisce un sondaggio
router.get('/:sondaggio_id', checkServizioId, usaToken, checkRuolo(['gds', 'utente']), async (req, res) => {
  getSondaggioById(req, res);
});

// Compila un sondaggio
router.post('/:sondaggio_id', checkServizioId, usaToken, checkRuolo(['utente']), async (req, res) => {
  creaFeedback(req, res);
});

// Risultati di un sondaggio
router.get('/:sondaggio_id/risultati', checkServizioId, usaToken, checkRuolo(['gds']), CheckDirittiServizio, async (req, res) => {
  getFeedback(req, res);
});

module.exports = router;
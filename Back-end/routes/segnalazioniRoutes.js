const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Model
const Segnalazione = require('../models/segnalazione.model');

// Controllers
const { getForm, generateForm } = require('../controllers/formController');
const { compilaForm, getCommenti } = require('../controllers/segnalazioneController');

// Middleware
const { checkRole, usingToken, checkServiceId } = require('../middleware/authMiddleware');

// Restitusce un oggetto con la form di segnalazione compilabile per uno specifico servizio
router.get('/form', checkServiceId, async (req, res) => {
  getForm(req, res);
});

// Genera la form di segnalazione compilabile del servizio specificato
router.post('/form', checkServiceId, usingToken, checkRole(['gds']), async (req, res) => {
  generateForm(req, res);
});

// Salva i dati del form di segnalazione del servizio compilata dall'utente
router.post('/compila', checkServiceId, usingToken, checkRole(['utente']), async (req, res) => {
  compilaForm(req, res);
});

// Restituisce i commenti delle segnalazioni di un servizio
router.get('/commenti', checkServiceId, async (req, res) => {
  getCommenti(req, res);
});

router.get('/servizi/{servizio_id}/segnalazioni/graficolinee', async (req, res) => {
  
});

router.get('/servizi/{servizio_id}/segnalazioni/graficotorta', async (req, res) => {
  
});




module.exports = router;
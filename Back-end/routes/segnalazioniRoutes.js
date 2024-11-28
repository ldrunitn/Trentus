const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Model
const Segnalazione = require('../models/segnalazione.model');

// Controllers
const { getForm, generateForm } = require('../controllers/formController');

// Middleware
const { checkRole, verifyTokenAndCheckServiceId } = require('../middleware/authMiddleware');

// Restitusce un oggetto con la form di segnalazione compilabile per uno specifico servizio
router.get('/form', SIDCheck, async (req, res) => {
  getForm(req, res);
});

// Genera la form di segnalazione compilabile del servizio specificato
router.post('/form', verifyTokenAndCheckServiceId, checkRole(['gds']), async (req, res) => {
  generateForm(req, res);
});

// Salva i dati del form di segnalazione del servizio {service_id} compilato dall'utente
router.get('/compila', async (req, res) => {
  
});

router.get('/servizi/{servizio_id}/segnalazioni/commenti', async (req, res) => {
  
});

router.get('/servizi/{servizio_id}/segnalazioni/graficolinee', async (req, res) => {
  
});

router.get('/servizi/{servizio_id}/segnalazioni/graficotorta', async (req, res) => {
  
});




module.exports = router;
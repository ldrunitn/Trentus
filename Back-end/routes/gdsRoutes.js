const express = require('express');
const router = express.Router();

// Controllers
const { validaCredenziali, confermaRichiesta } = require('../controllers/gdsController');
const { creaRichiesta } = require('../controllers/richiestaGdSController');
// const gdsController = require(process.cwd()+'/controllers/gds/gdsController');

// Middleware 
const { usaToken, checkRuolo, checkServizioId, CheckServiceGdSConnection, SIDSave } = require('../middleware/authMiddleware');

// Login GdS
router.post('/login', async (req, res) => {
  validaCredenziali(req,res);
});

// Invia richiesta di registrazione
router.post('/registrazione', async (req, res) => {
  creaRichiesta(req,res);
});

// Conferma della richiesta di registrazione 
router.get('/conferma/:richiesta_id', usaToken, checkRuolo(['superadmin']), async (req,res)=>{
  confermaRichiesta(req, res);
});

// Restituisce il servizio associato al GdS
router.get('/servizio', usaToken, checkRuolo(['gds']), async (req,res)=>{
  return req.user.servizio_id;
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Controllers
const { validaCredenziali, confermaRichiesta } = require('../controllers/gdsController');
const { creaRichiesta } = require('../controllers/richiestaGdSController');
const { getServiceByGdSId } = require('../controllers/servizioController');
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
router.get('/conferma/:gds_id', usaToken, checkRuolo(['superadmin']), async (req,res)=>{
  confermaRichiesta(req, res);
});

// Restituisce dati del servizio associato al GdS
// Non trovo il senso di questa api
// Serve  per trovare il servizio del gds ma per farlo serve l'id del servizio?
// Ma allora se abbiamo l'id del gds, che è già nel token, non possiamo controllare
// Che un servizio sia suo prima di averlo??
router.get(':servizio_id/servizio', usaToken, checkRuolo(['gds']), SIDSave, checkServizioId, CheckServiceGdSConnection, async (req,res)=>{
  getServiceByGdSId(req,res);
});

module.exports = router;
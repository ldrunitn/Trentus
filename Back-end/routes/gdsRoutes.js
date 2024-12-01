const express = require('express');
const router = express.Router();

// Controllers
const { validateCredentials, confirmRequest } = require('../controllers/gdsController');
const { createRequest } = require('../controllers/richiestaGdSController');
const { getServiceByGdSId } = require('../controllers/servizioController');
// const gdsController = require(process.cwd()+'/controllers/gds/gdsController');

// Middleware 
const { usingToken, checkRole, CheckServiceGdSConnection } = require('../middleware/authMiddleware');

// Login GdS
router.post('/login', async (req, res) => {
  validateCredentials(req,res);
});

// Invia richiesta di registrazione
router.post('/registrazione', async (req, res) => {
  createRequest(req,res);
});

// Conferma della richiesta di registrazione 
router.get('/conferma/:gds_id', usingToken, checkRole(['superadmin']), async (req,res)=>{
  confirmRequest(req, res);
});

// Restituisce dati del servizio associato al GdS
// Non trovo il senso di questa api
// Serve  per trovare il servizio del gds ma per farlo serve l'id del servizio?
// Ma allora se abbiamo l'id del gds, che è già nel token, non possiamo controllare
// Che un servizio sia suo prima di averlo??
router.get(':service_id/servizio', usingToken, CheckServiceGdSConnection, checkRole(['gds']), async (req,res)=>{
  getServiceByGdSId(req,res);
});

module.exports = router;
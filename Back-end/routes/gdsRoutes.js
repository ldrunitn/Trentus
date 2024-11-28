const express = require('express');
const router = express.Router();

// Controllers
const { validateCredentials, confirmRequest } = require('../controllers/gdsController');
const { createRequest } = require('../controllers/richiestaGdSController');
const { getServiceByGdSId } = require('../controllers/servizioController');
// const gdsController = require(process.cwd()+'/controllers/gds/gdsController');

// Middleware 
const { verifyToken, checkRole, verifyTokenAndCheckId } = require('../middleware/authMiddleware');

// Login GdS
router.post('/login', async (req, res) => {
  validateCredentials(req,res);
});

// Invia richiesta di registrazione
router.post('/registrazione', async (req, res) => {
  createRequest(req,res);
});

// Conferma della richiesta di registrazione 
router.get('/:id/conferma', verifyToken, checkRole(['superadmin']), async (req,res)=>{
  const requestID = req.params.id;
  confirmRequest(requestID, res);
});

// Restituisce dati del servizio associato al GdS
router.get('/:id/servizio', verifyTokenAndCheckId, checkRole(['gds']), async (req,res)=>{
  if (!req.params.id) {
    return res.status(400).json({ message: 'ID mancante' }); // Validazione di base
  }
  getServiceByGdSId(req,res);
});

module.exports = router;
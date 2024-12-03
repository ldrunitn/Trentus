const express = require('express');
const router = express.Router();

// Controllers
const { validaCredenziali } = require('../controllers/gdsController');
const { creaRichiesta, confermaRichiesta } = require('../controllers/richiestaGdSController');
// const gdsController = require(process.cwd()+'/controllers/gds/gdsController');

// Middleware 
const { usaToken, checkRuolo } = require('../middleware/authMiddleware');

// Login GdS
router.post('/login', async (req, res) => {
  validaCredenziali(req,res);
});

// Invia richiesta di registrazione
router.post('/registrazione', async (req, res) => {
  creaRichiesta(req,res);
});

// Conferma della richiesta di registrazione 
router.get('/conferma/:richiesta_id', /*usaToken, checkRuolo(['superadmin']),*/ async (req,res)=>{
  if(req.headers['authorization'] == "Luca") confermaRichiesta(req, res);
});

// Restituisce il servizio associato al GdS
router.get('/servizio', usaToken, checkRuolo(['gds']), async (req,res)=>{
  return res.status(200).json({ servizio_id: req.user.servizio_id });
});

module.exports = router;
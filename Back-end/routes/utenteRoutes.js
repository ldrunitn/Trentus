const express = require('express');
const router = express.Router();

// Controllers
const { creaUtente, verificaCredenziali, getPreferiti, getUtente } = require('../controllers/utenteController');
// const utentiController = require(process.cwd()+'/controllers/utente/utenteController');

// Middleware 
const { usaToken, checkRuolo } = require('../middleware/authMiddleware');

// Rotta protetta... wut?
router.get('/', usaToken, checkRuolo(['utente']), (req, res) => {
  getUtente(req,res);
});

// Login utente
router.post('/login', async (req, res) => {
  verificaCredenziali(req,res);
});

// Registrazione utente
router.post('/registrazione', async (req, res) => {
  creaUtente(req,res);
});

// Restituisce i preferiti dell'utente con id specificato
router.get('/preferiti', usaToken, checkRuolo(['utente']), (req,res)=>{
  getPreferiti(req,res);
});

module.exports = router;
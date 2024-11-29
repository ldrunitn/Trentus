const express = require('express');
const router = express.Router();

// Controllers
const { createUser, verifyCredentials, getFavorites, getUserById } = require('../controllers/utenteController');
// const utentiController = require(process.cwd()+'/controllers/utente/utenteController');

// Middleware 
const { usingToken, checkRole } = require('../middleware/authMiddleware');

// Rotta protetta... wut?
router.get('/', usingToken, checkRole(['utente']), (req, res) => {
  getUserById(req,res);
});

// Login utente
router.post('/login', async (req, res) => {
  verifyCredentials(req,res);
});

// Registrazione utente
router.post('/registrazione', async (req, res) => {
  createUser(req,res,'utente');
});

// Restituisce i preferiti dell'utente con id specificato
router.get('/preferiti', usingToken, checkRole(['utente']), (req,res)=>{
  getFavorites(req,res);
});

module.exports = router;
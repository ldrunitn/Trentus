const express = require('express');
const router = express.Router();

// Controllers
const { createUser, verifyCredentials, getFavorites, getUserById } = require('../controllers/utenteController');
// const utentiController = require(process.cwd()+'/controllers/utente/utenteController');

// Middleware 
const { verifyTokenAndCheckId, checkRole } = require('../middleware/authMiddleware');

// Login utente
router.post('/login', async (req, res) => {
  verifyCredentials(req,res);
});

// Registrazione utente
router.post('/registrazione', async (req, res) => {
  createUser(req,res,'user');
});

// Restituisce i preferiti dell'utente con id specificato
router.get('/:id/preferiti', verifyTokenAndCheckId, checkRole(['user']), (req,res)=>{
  if (!req.params.id) {
    return res.status(400).json({ message: 'ID mancante' }); // Validazione di base
  }
  getFavorites(req,res);
});

// Rotta protetta
router.get('/:id', verifyTokenAndCheckId, checkRole(['user']), (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'ID mancante' }); // Validazione di base
  }
  getUserById(req,res);
});

module.exports = router;
const express = require('express');
// const utentiController = require(process.cwd()+'/controllers/utente/utenteController');
const router = express.Router();
const {createUser, verifyCredentials, getFavorites, getUserById} = require('../../controllers/utenteController')
const { verifyToken, verifyTokenAndCheckId, checkRole} = require('../../middleware/authMiddleware');
// registrazione utente
router.post('/login', async (req, res) => {
  verifyCredentials(req,res);
});
//api per registrare un UTENTE
router.post('/registrazione', async (req, res) => {
  createUser(req,res,'user');
});
// ritorna i preferiti dell'utente con id specificato
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
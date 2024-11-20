const express = require('express');
// const utentiController = require(process.cwd()+'/controllers/utente/utenteController');
const router = express.Router();
const {createUser, verifyCredentials} = require('../../controllers/utenteController')
const { verifyToken } = require('../../middleware/authMiddleware');
// registrazione utente
router.post('/login', async (req, res) => {
  verifyCredentials(req,res);
});
//api per registrare un UTENTE
router.post('/registrazione', async (req, res) => {
  createUser(req,res,'user');
});
// Rotta protetta
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Benvenuto!` });
});


module.exports = router;
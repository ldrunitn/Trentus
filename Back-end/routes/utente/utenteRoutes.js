const express = require('express');
// const utentiController = require(process.cwd()+'/controllers/utente/utenteController');
const bcrypt = require('bcryptjs');
const User = require('../../schemas/utente.schema');
const { verifyToken, generateToken } = require('../../middleware/authMiddleware');
const router = express.Router();
// registrazione utente
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email non corretta' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password errata' });
    }
    // const token = generateToken(user,'user');
    console.log("ruolo: " + user.role);
    const token = generateToken(user,user.role); //genero il token in base al ruolo del utente
    res.json({ message: 'Login effettuato', token });
  } catch (err) {
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
});
//api per registrare un UTENTE
router.post('/registrazione', async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    // Verifica se l'utente esiste già
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email già registrata' });
    }

    // Hash della password con un "salt" di 10 round
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea il nuovo utente con la password hashata
    const user = new User({ 
      email, 
      passwordHash: hashedPassword // Salva l'hash della password
    });
    console.log(user);

    // Salva l'utente nel database
    await user.save();

    res.status(201).json({ message: 'Utente registrato con successo' });

  } catch (err) {
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
});
// Rotta protetta
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Benvenuto utente con email: ${req.utente.email}` });
});


module.exports = router;
const express = require('express');
const User = require('../../schemas/utente.schema');
const { verifyToken, generateToken } = require('../../middleware/authMiddleware');
const router = express.Router();
// Login UTENTE
router.post('/utente', async (req, res) => {
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
    const token = generateToken(user);
    res.json({ message: 'Login effettuato', token });
  } catch (err) {
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
});
// Rotta protetta
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Benvenuto utente con email: ${req.utente.email}` });
});


module.exports = router;
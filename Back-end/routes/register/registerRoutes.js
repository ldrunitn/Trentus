const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../schemas/utente.schema');
const router = express.Router();

//api per registrare un UTENTE
router.post('/utente', async (req, res) => {
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


module.exports = router;
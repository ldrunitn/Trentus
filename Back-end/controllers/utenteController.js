const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Model
const User = require('../models/utente.model');

// Middleware
const { generateToken } = require('../middleware/authMiddleware');

// Crea un utente
exports.createUser = async (req, res, role) => {
  const { email, password } = req.body;
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
      passwordHash: hashedPassword, // Salva l'hash della password
      role
    });

    // Salva l'utente nel database
    await user.save();

    res.status(201).json({ message: 'Utente registrato con successo' });

  } catch (err) {
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
}

// Verifica le credenziali dell'utente
exports.verifyCredentials = async (req,res,role) => {
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
    let token;
    if(!role)
      token = generateToken(user,user.role); //genero il token in base al ruolo del utente
    else token = generateToken(user,role); //genero il token in base al ruolo del utente
      
    res.json({ message: 'Login effettuato', token });
  } catch (err) {
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
}

// Restituisce i preferiti dell'utente
exports.getFavorites = async (req,res) => {
  //trovo l'utente con l'id
  id = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID non valido' });
  }
  const user = await User.findById(id).select('preferiti');
  if(!user){
    return res.status(404).json({ message: 'Utente non trovato'});
  }
  console.log(user.preferiti);
  return res.status(200).json({preferiti: user.preferiti});
}

// Restituisce un utente
exports.getUserById = async (req,res) => {
  //trovo l'utente con l'id
  id = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID non valido' });
  }
  const user = await User.findById(id).select('_id email preferiti');
  if(!user){
    return res.status(404).json({ message: 'Utente non trovato'});
  }
  console.log(user);
  return res.status(200).json(user);
}
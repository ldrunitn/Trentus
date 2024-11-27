const jwt = require('jsonwebtoken');
const Servizio = require('../model/servizio.model');
require('dotenv').config();
const mongoose = require('mongoose');
const SECRET_KEY = process.env.JWT_SECRET

// Funzione per generare un token JWT
exports.generateToken = (user, ruolo) => {
  return jwt.sign({ id: user._id, username: user.username, role: ruolo }, SECRET_KEY, { expiresIn: '3h' });
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token mancante' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Aggiunge i dati dell'utente alla richiesta
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token non valido' });
  }
};
exports.verifyTokenAndCheckId = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token mancante' });
  }
  const id = req.params.id;
  if(!id){
    return res.status(401).json({ message: 'ID mancante' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if(decoded.id !== id){
      return res.status(403).json({ message: 'Accesso non autorizzato' });
    }
    // Prosegui con il middleware successivo
    req.user = decoded; // Passo l'utente verificato al prossimo middleware
    next();
  } catch (err) {
    console.log(err.message)
    return res.status(401).json({ message: 'Token non valido' });
  }
};
//come quella sopra, ma per le rotte che includono l'id del servizio
//quindi bisogna recuperare l'id del gds associato a quel servizio
exports.verifyTokenAndCheckServiceId = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token mancante' });
  }
  const id = req.params.id;

  if(!id){
    console.log(req.originalUrl);
    return res.status(401).json({ message: 'ID mancante' });
  }

  //recupero il gds associato
  const result = await Servizio.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) } // Filtra il servizio con l'ID specifico
    },
    {
      $lookup: {
        from: 'gds', // Nome della collezione "secondaria"
        localField: '_id', // Campo nella collezione principale
        foreignField: 'servizio', // Campo nella collezione "secondaria"
        as: 'gds' // Nome dell'array con i dati uniti
      }
    },
    {
      $project: {
        _id: 0, // Esclude il campo `_id`
        gds: 1, // Include solo il campo `gds`
      }
    }
  ]);
  if(!result){
    return res.status(404).json({message: 'Nessun gestrore associato al servizio trovato'});
  }
  let gds = result[0].gds; // ora ho tutti i gds registrati a questo servizio

  try {
    //controllo che l'id nel token sia uguale a uno dei gds che gestiscono il servizio 
    const decoded = jwt.verify(token, SECRET_KEY);
    let trovato = false;
    gds.forEach(element => {
      if(element['_id'].equals(new mongoose.Types.ObjectId(decoded.id)))
        trovato = true;
    });
    if(!trovato){
      return res.status(403).json({ message: 'Accesso non autorizzato' });
    }
    // Prosegui con il middleware successivo
    req.user = decoded; // Passo l'utente verificato al prossimo middleware
    next();
  } catch (err) {
    console.log(err.message)
    return res.status(401).json({ message: 'Token non valido' });
  }
};
//middleware che controlla che il ruolo dell'utente che cerca di accedere sia quello specificato
exports.checkRole = (roles) => { 
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accesso negato. Non hai i permessi per questa azione.' });
    }
    next(); // Passa al prossimo middleware o al controller della rotta
  };
};
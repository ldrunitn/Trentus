const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Preleva la chiave 
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET

// Model
const Servizio = require('../models/servizio.model');

// Genera un token JWT dalla durata di 3h
exports.generateToken = (user, ruolo) => {
  return jwt.sign({ id: user._id, username: user.username, role: ruolo }, SECRET_KEY, { expiresIn: '3h' });
};

// Verifico la correttezza di un token JWT e ne salvo i dati
exports.usingToken = (req, res, next) => {
  const token = req.headers['authorization'];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Aggiunge i dati dell'utente alla richiesta
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token non valido' });
  }
};

// Verifico l'esistenza del servizio
exports.checkServiceId = (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.service_id)){
    return res.status(400).json({ message: 'Servizio inesistente' });
  }
  next();
}

// Controlla che il ruolo dell'utente che cerca di accedere sia quello specificato
exports.checkRole = (roles) => { 
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accesso negato. Non hai i permessi per questa azione.' });
    }
    next(); // Passa al prossimo middleware o al controller della rotta
  };
};

// Verifico che l'user sia il possessore del servizio utilizzato
exports.CheckServiceGdSConnection = async (req, res, next) => {
  const id = req.service_id;
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
    return res.status(404).json({message: 'Nessun gestore associato al servizio trovato'});
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
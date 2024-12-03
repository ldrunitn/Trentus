const bcrypt = require('bcryptjs');

// Models
const richiestaGdS = require('../models/richiestaGdS.model');
const GdS = require('../models/gds.model');

// Crea una richiesta di accettazione della creazione del gds ed il suo servizio
exports.creaRichiesta = async (req,res) => {
  const { email, password, titolo, azienda, url, foto, descrizione } = req.body;

  console.log(req.body);

  try {
    // Verifica se il GdS esiste già, devo verificare sia se c'è già un utente registrato, sia se c'è una richiesta
    const existingGdS = await GdS.findOne({email});
    const existingRequest = await richiestaGdS.findOne({email});
    if (existingGdS || existingRequest) {
      return res.status(400).json({ message: 'Richiesta già spedita' });
    }

    // Hash della password con un "salt" di 10 round
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea il nuovo utente con la password hashata
    const richiesta = new richiestaGdS({ 
      email, 
      passwordHash: hashedPassword, // Salva l'hash della password
      titolo,
      azienda,
      url,
      foto,
      descrizione
    });
    console.log(richiesta);

    // Salva l'utente nel database
    await richiesta.save();

    res.status(201).json({ message: 'Richiesta inviata con successo' });

  } catch (err) {
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
}

// Questa dove viene usata?
exports.confermaRichiesta = async (request,session) => {
  request.confermata = true;
  await request.save({session});
} 

// Restituisce una richiesta specifica
exports.getRichiesta = async (reqId,session) => {
  const request = await richiestaGdS.findOne({_id:reqId, confermata:false}).session(session);
  return request;
}

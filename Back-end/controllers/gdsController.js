const mongoose = require('mongoose');

// Model
const GdS = require('../models/gds.model');

// Controllers
const { getRichiesta } = require('../controllers/richiestaGdSController');
const { creaServizio } = require('./servizioController');

// Middleware
const { generaToken } = require('../middleware/authMiddleware');
 
// Valida le credenziali del gds a login
exports.validaCredenziali = async (req,res) => {
  const { email, password } = req.body;
  try {
    const gds = await GdS.findOne({ email });
    if (!gds) {
      return res.status(400).json({ message: 'Email non corretta' });
    }

    const isMatch = await gds.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password errata' });
    }
    const token = generaToken(gds,'gds');
    res.json({ message: 'Login effettuato', token });
  } catch (err) {
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
}

// Conferma la creazione di un nuovo gds ed il suo servizio associato
exports.confermaRichiesta = async (req, res) => { // Attenzione, solo il superdmin può invocarla
  const requestID = req.params.richiesta_id;
  if (!mongoose.Types.ObjectId.isValid(requestID)) {
    return res.status(400).json({ message: 'ID non valido' });
  }
  const session = await mongoose.startSession(); // faccio partire una sessione per usare le transazioni
  try {
    //trovo i dati della richiesta corrispondente
    session.startTransaction(); //faccio partire il transazione, visto che devo modificare due entità, in questo modo sono sicuro che entrambe o nessuna vengano modificate 
    const request = await getRichiesta(requestID,session);
    if (!request) {
      session.abortTransaction();
      return res.status(404).json({ message: 'Richiesta non trovata' });
    }
    const service_id = await creaServizio(request,session);
    //ora devo creare il gds con il servizio corrispondente
    const gds = new GdS({
      email: request['email'],
      passwordHash: request['passwordHash'],
      servizio: service_id
    });
    await gds.save({session}); // salvo il gds
    request.confermata = true; //confermo la richiesta
    await request.save({session});


    //confermo la transazione
    await session.commitTransaction();

    res.status(201).json({ message: 'GdS creato con successo'});
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Errore del server', error: err.message });
  } 
  finally{
    session.endSession();
  }
}

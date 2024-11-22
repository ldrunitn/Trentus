const GdS = require('../model/gds.model');
const {createService} = require('./servizioController');
const {generateToken} = require('../middleware/authMiddleware');
const {confirmReq, getRequest} = require('../controllers/richiestaGdSController');
const mongoose = require('mongoose');

exports.validateCredentials = async (req,res) => {
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
    const token = generateToken(gds,'gds');
    res.json({ message: 'Login effettuato', token });
  } catch (err) {
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
}
exports.confirmRequest = async (requestID, res) => {
  console.log("inizio funzione");
  if (!mongoose.Types.ObjectId.isValid(requestID)) {
    return res.status(400).json({ message: 'ID non valido' });
  }
  const session = await mongoose.startSession(); // faccio partire una sessione per usare le transazioni
  try {
    //trovo i dati della richiesta corrispondente
    session.startTransaction(); //faccio partire il transazione, visto che devo modificare due entità, in questo modo sono sicuro che entrambe o nessuna vengano monidificate 
    const request = await getRequest(requestID,session);
    if (!request) {
      session.abortTransaction();
      return res.status(404).json({ message: 'Richiesta non trovata' });
    }
    const service_id = await createService(request,session);
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
    console.log('committata')

    res.status(201).json({ message: 'GdS creato con successo'});
    console.log('finito');
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Errore del server', error: err.message });
  } 
  finally{
    session.endSession();
  }
}
exports.getService = async (req,res) =>{
  id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID non valido' });
  }
  const service_id = await GdS.findById(id).select('servizio');
  if(!user){
    return res.status(404).json({ message: 'Utente non trovato'});
  }
  console.log(user);
  return res.status(200).json(user);
}
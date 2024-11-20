const express = require('express');
// const gdsController = require(process.cwd()+'/controllers/gds/gdsController');
const bcrypt = require('bcryptjs');
const GdSRequest = require('../../schemas/richiestaGdS.schema');
const GdS = require('../../schemas/gds.schema');
const { verifyToken, generateToken, checkRole } = require('../../middleware/authMiddleware');
const RichiestaGdS = require('../../schemas/richiestaGdS.schema');
const router = express.Router();
const mongoose = require('mongoose');
// login GdS
router.post('/login', async (req, res) => {
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
});
//pai per mandare la richiesta di registrazione
router.post('/registrazione', async (req, res) => {
  const { email, password, titolo, azienda, url, foto, descrizione } = req.body;

  console.log(req.body);

  try {
    // Verifica se il GdS esiste già, devo verificare sia se c'è già un utente registrato, sia se c'è una richiesta
    const existingGdS = await GdS.findOne({ email });
    const existingRequest = await RichiestaGdS.findOne({email});
    if (existingGdS || existingRequest) {
      return res.status(400).json({ message: 'Email già registrata o richiesta già spedita' });
    }

    // Hash della password con un "salt" di 10 round
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea il nuovo utente con la password hashata
    const richiesta = new GdSRequest({ 
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

    res.status(201).json({ message: 'Richiesta mandata con successo' });

  } catch (err) {
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
});
//devo confermare la richiesta quindi
//1) Creare il gds nel database
//2) Creare anche il servizio corrispondente
//3) Mettere la richiesta a confermata
router.get('/:id/conferma', verifyToken, checkRole(['superadmin']), async (req,res)=>{
  const requestID = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(requestID)) {
    return res.status(400).json({ message: 'ID non valido' });
  }
  const session = await mongoose.startSession(); // faccio partire una sessione per usare le transazioni
  try {
    //trovo i dati della richiesta corrispondente
    session.startTransaction(); //faccio partire il transazione, visto che devo modificare due entità, in questo modo sono sicuro che entrambe o nessuna vengano monidificate 
    const request = await RichiestaGdS.findOne({_id:requestID, confermata:false}) //guardo se esiste una richiesta non confermata l'id inserito
    if (!request) {
      return res.status(404).json({ message: 'Richiesta non trovata' });
    }
    //ora devo creare il gds con il servizio corrispondente
    const gds = new GdS({
      email: request['email'],
      passwordHash: request['passwordHash'],
      servizio: {
        titolo: request['titolo'],
        azienda: request['azienda'],
        url: request['url'],
        foto: request['foto'],
        descrizione: request['descrizione']
      }
    });
    console.log(gds);
    await gds.save(); // salvo il gds
    request.confermata = true;
    await request.save(); //metto la richiesta come confermata

    //confermo la transazione
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'GdS creato con successo'});
  } catch (err) {
    res.status(500).json({ message: 'Errore del server', error: err.message });
  }
});

module.exports = router;
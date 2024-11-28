const express = require('express');
const router = express.Router();

// Model
const Servizio = require('../models/servizio.model');

// Controllers
const segnalazioneController = require('../controllers/segnalazioneController');
// const serviziController = require(process.cwd()+'/controllers/servizi/serviziController');

// Middleware
const { checkRole, verifyTokenAndCheckServiceId } = require('../middleware/authMiddleware');

// Restituisce tutti i servizi
router.get('/', async (req, res) => {
  try {
    // Ottengo tutti i record della collezione "service"
    const services = await Servizio.find();

    // Rispondo con i dati
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei dati', error: error.message });
  }
})

// Restituisce servizio in base al suo id
router.get('/:id', async (req,res)=>{
  if(!req.params.id) {
    return res.status(400).json({message: "ID mancante"});
  }
  let servizio = await Servizio.findById(req.params.id);
  return res.status(200).json(servizio);

});

// Riceve un array di stringhe e compone la form di segnalazione
router.post('/:id/segnalazioni/form', verifyTokenAndCheckServiceId, checkRole(['gds']), async (req,res) => {
  if(!req.params.id) {
    return res.status(400).json({ message: 'ID mancante' }); // Validazione di base
  }
  segnalazioneController.createForm(req, res);
});

// Restituisce la form del servizio specificato
router.get('/:id/segnalazioni/form', async (req,res) => {
  if(!req.params.id) {
    return res.status(400).json({ message: 'ID mancante' }); // Validazione di base
  }
  segnalazioneController.getForm(req, res);
});

module.exports = router;
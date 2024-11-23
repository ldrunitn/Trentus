const express = require('express');
// const serviziController = require(process.cwd()+'/controllers/servizi/serviziController');
const Servizio = require('../../model/servizio.model');
const { getServiceByGdSId } = require('../../controllers/servizioController');
const {verifyTokenAndCheckId, checkRole, verifyTokenAndCheckServiceId} = require('../../middleware/authMiddleware');
const segnalazioneController = require('../../controllers/segnalazioneController');
const router = express.Router();

//ritorna tutti i servizi
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

//ottiene dati del servizio associato al GdS
router.get('/:id', verifyTokenAndCheckId, checkRole(['gds']), async (req,res)=>{
  if (!req.params.id) {
    return res.status(400).json({ message: 'ID mancante' }); // Validazione di base
  }
  getServiceByGdSId(res,req);
});

//riceve un array di stringhe e compone la form di segnalazione
router.post('/:id/segnalazioni/form', verifyTokenAndCheckServiceId, checkRole(['gds']), async (req,res) => {
  if(!req.params.id){
    return res.status(400).json({ message: 'ID mancante' }); // Validazione di base
  }
  segnalazioneController.createForm(req, res);
});
//restituisce   
router.get('/:id/segnalazioni/form', async (req,res) => {
  if(!req.params.id){
    return res.status(400).json({ message: 'ID mancante' }); // Validazione di base
  }
  segnalazioneController.getForm(req, res);
});

module.exports = router;
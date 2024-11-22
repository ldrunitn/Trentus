const express = require('express');
// const serviziController = require(process.cwd()+'/controllers/servizi/serviziController');
const Servizio = require('../../model/servizio.model');
const { getServiceByGdSId } = require('../../controllers/servizioController');
const {verifyTokenAndCheckId, checkRole} = require('../../middleware/authMiddleware');
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

module.exports = router;
const express = require('express');
// const serviziController = require(process.cwd()+'/controllers/servizi/serviziController');
const Servizio = require('../../model/servizio.model')
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
});

module.exports = router;
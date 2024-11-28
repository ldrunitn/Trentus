const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const avvisi = await Avviso.find({ servizio_id: new mongoose.Types.ObjectId(req.service_id) });
    res.status(200).json(avvisi);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei dati', error: error.message });
  }
});

module.exports = router;
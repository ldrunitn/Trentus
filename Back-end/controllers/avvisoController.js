const mongoose = require('mongoose');

// Model
const Avviso = require('../models/avviso.model');
const { servizioOff } = require('../controllers/servizioController');

// Crea un avviso
exports.creaAvviso = async (req,  res) => {
    //creo il servizio
    const { titolo, corpo, tipo, inizio, fine } = req.body;
    const avviso = new Avviso({
      titolo,
      corpo,
      tipo,
      inizio: new Date(inizio),
      fine: new Date(fine),
      servizio_id: req.servizio_id
    });
    await avviso.save(); //salvo il servizio ottenendo l'id
    servizioOff(req, res);
}

// Restituisce tutti gli avvisi di un servizio
exports.getAvvisi = async (req,  res) => {
  try {
    const avvisi = await Avviso.find({ servizio_id: new mongoose.Types.ObjectId(req.servizio_id) });
    res.status(200).json(avvisi);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei dati', error: error.message });
  }
}

// Restituisce un avviso
exports.getAvvisoById = async (req,  res) => {
  try {
    const avviso = await Avviso.findById(req.params.avviso_id);
    if(avviso.servizio_id != req.servizio_id){
      return res.status(400).json({message:'L\'avviso non è del servizio corretto'});
    }
    return res.status(200).json(avviso);
  } catch (error) {
    return res.status(500).json({ message: 'Errore nel recupero dei dati', error });
  }
}
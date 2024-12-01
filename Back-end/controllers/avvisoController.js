const mongoose = require('mongoose');

// Model
const Avviso = require('../models/avviso.model');

// Crea un avviso
exports.createAvviso = async (req,  res) => {
    //creo il servizio
    const { titolo, contenuto, tipo, inizio, fine, servizio_id } = req.body;
    const avviso = new Avviso({
      titolo,
      contenuto,
      tipo,
      inizio: new Date(inizio),
      fine: new Date(fine),
      servizio_id
    });
    const avviso_id = await avviso.save(); //salvo il servizio ottenendo l'id
    res.status(201).json({message: "Avviso creato correttamente"});
    return avviso_id;
}

// Restituisce tutti gli avvisi di un servizio
exports.getAvvisi = async (req,  res) => {
  try {
    const avvisi = await Avviso.find({ servizio_id: new mongoose.Types.ObjectId(req.service_id) });
    res.status(200).json(avvisi);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei dati', error: error.message });
  }
}

// Restituisce un avviso
exports.getAvviso = async (req,  res) => {
  try {
    const avviso = await Avviso.findById(req.params.avviso_id);
    if(avviso.servizio_id != req.service_id){
      return res.status(400).json({message:'L\'avviso non è del servizio corretto'});
    }
    return res.status(200).json(avviso);
  } catch (error) {
    return res.status(500).json({ message: 'Errore nel recupero dei dati', error });
  }
}
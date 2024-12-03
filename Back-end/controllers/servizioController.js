const mongoose = require('mongoose');

// Models
const GdS = require('../models/gds.model');
const Servizio = require('../models/servizio.model');

// Crea un servizio
exports.createService = async (req, res) => {
  const servizio = new Servizio({
    titolo: request['titolo'],
    azienda: request['azienda'],
    url: request['url'],
    foto: request['foto'],
    descrizione: request['descrizione']
  });
  const service_id = await servizio.save({res}); //salvo il servizio ottenendo l'id
  return service_id;
}

// Restituisce un servizio specifico
exports.getServizio = async (req,res) => {
  try{
    let s = await Servizio.findById(req.servizio_id);
    return res.status(200).json(s);
  } 
  catch(err){
    return res.status(500).json({message: "Errore del server"});
  }
}

// Restituisce tutti i servizi
exports.getServizi = async (req,res) => {
  try {
    // Ottengo tutti i record della collezione "service"
    const services = await Servizio.find();

    // Rispondo con i dati
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei dati', error: error.message });
  }
}
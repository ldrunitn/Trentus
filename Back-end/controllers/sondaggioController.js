const mongoose = require('mongoose');

// Model
const Sondaggi = require('../models/sondaggio.model');

// Restituisce i sondaggi di uno specifico servizio
exports.getSondaggi = async (req,res) => {
  try{
    let sondaggi = await Sondaggi.find(req.service_id).select('titolo');
    if(!sondaggi){
      return res.status(404).json({message:'Sondaggi non trovati'});
    }
    return res.status(200).json(sondaggi);
  }
  catch(err){
    return res.status(500).json({message:'Errore del server'});
  }
}

// Crea un sondaggio per uno specifico servizio
exports.getSondaggi = async (req,res) => {
  try{
    let sondaggi = await Sondaggi.find(req.service_id).select('titolo');
    if(!sondaggi){
      return res.status(404).json({message:'Sondaggi non trovati'});
    }
    return res.status(200).json(sondaggi);
  }
  catch(err){
    return res.status(500).json({message:'Errore del server'});
  }
}
const mongoose = require('mongoose');

// Model
const Segnalazione = require('../models/segnalazione.model');

exports.compilaForm = async (req,res) => {
  //recupero l'array di opzioni (stringhe)
  const { options, checks, commento } = req.body;
  if(!options){
    return res.status(400).json({message: "Opzioni non presenti; impossibile creare la form"});
  }
  try {
    const opzioniSegnalazione = options.map((t, index) => ({
      testo: t,
      check: checks?.[index],
      tipo: 'check'
    }));
    console.log(opzioniSegnalazione);
    const segnalazione = new Segnalazione({
      opzioni: opzioniSegnalazione,
      commento,
      utente_id: req.user.id,
      servizio_id: req.service_id
    });
    // infine lo salvo
    await segnalazione.save();
    return res.status(201).json({message: 'Segnalazione creata con successo'});
  }
  catch(err){
    console.log(err.message);
    return res.status(500).json({message: 'Errore del server'});
  }
}

exports.getCommenti = async (req,res) => {
  try {
    let commenti = await Segnalazione.find({ servizio_id: req.service_id }).select("commento");
    return res.status(201).json(commenti);
  }
  catch(err){
    console.log(err.message);
    return res.status(500).json({message: 'Errore del server'});
  }
}


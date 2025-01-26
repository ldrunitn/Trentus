const mongoose = require('mongoose');

// Model
const Segnalazione = require('../models/segnalazione.model');

exports.compilaForm = async (req,res) => {
  //recupero l'array di opzioni (stringhe)
  const { risposte, commento } = req.body;
  if(!risposte){
    return res.status(400).json({message: "La form non è stata compilata"});
  }
  try {
    const risposteOggetto = risposte.map(testo => ({
      risposta: testo
    }));
    const segnalazione = new Segnalazione({
      risposte: risposteOggetto,
      commento,
      utente_id: req.user.id,
      servizio_id: req.servizio_id
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
    let commenti = await Segnalazione.find({ servizio_id: req.servizio_id }).select("commento utente_id");
    return res.status(201).json(commenti);
  }
  catch(err){
    console.log(err.message);
    return res.status(500).json({message: 'Errore del server'});
  }
}


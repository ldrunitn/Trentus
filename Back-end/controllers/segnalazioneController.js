const mongoose = require('mongoose');

// Model
const Segnalazione = require('../models/segnalazione.model');

exports.generateForm = async (req,res) => {
  //recupero l'array di opzioni (stringhe)
  const { options, commento } = req.body;
  id = req.servizio_id;
  if(!options){
    return res.status(400).json({message: "Opzioni non presenti; impossibile creare la form"});
  }
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){ //id del servizio?
    return res.status(400).json({message: 'ID non valido'});
  }

  try{
    let opzioniSegnalazione = [];
    options.forEach(t => {
      opzioniSegnalazione.push({
        testo: t,
        check: false,
        tipo: 'check'
      })
    });
    let segnalazione = new Segnalazione({
      opzioniSegnalazione,
      commento,
      undefined,
      id
    });
    // infine lo salvo
    await service.save();
    return res.status(201).json({message: 'Form creata con successo'});
  }
  catch(err){
    console.log(err.message);
    return res.status(500).json({message: 'Errore del server'});
  }
}


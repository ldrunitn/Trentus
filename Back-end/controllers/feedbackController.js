const mongoose = require('mongoose');

// Model
const Feedback = require('../models/feedback.model');

// Restituisce i sondaggi di uno specifico servizio
exports.getFeedback = async (req,res) => {
  try{
    let feedback = await Feedback.find({ sondaggio_id: req.params.sondaggio_id });
    if(!feedback){
      return res.status(404).json({message:'Feedback non trovati'});
    }
    return res.status(200).json(feedback);
  }
  catch(err){
    return res.status(500).json({message:'Errore del server'});
  }
}

// Compila un sondaggio
exports.compilaSondaggio = async (req,res) => {
  //recupero l'array di opzioni (stringhe)
  const { risposte } = req.body;
  if(!risposte){
    return res.status(400).json({message: "Il sondaggio non è stato compilato"});
  }
  try {
    const risposteOggetto = risposte.map(rp => {
      const { type, ...rest } = rp;
      switch (type) {
        case 'singola':
          return { type: 'singola', risposta: rest.risposta };
        case 'raccolta':
          const risposteRaccolta = rest.risposte.map(rps => {
            return { risposta: rps.risposta };
          });
          return { type: 'raccolta', domanda: rest.domanda, risposte: risposteRaccolta, tipo: rest.tipo };
        case 'aperta':
          return { type: 'aperta', domanda: rest.domanda, risposta: rest.risposta };
        default:
          throw new Error(`Tipo di opzione non valido: ${type}`);
      }
    });
    const feedback = new Feedback({
      risposte: risposteOggetto,
      utente_id: req.user.id,
      sondaggio_id: req.params.sondaggio_id,
      servizio_id: req.service_id
    });
    // infine lo salvo
    const help = await feedback.save();
    console.log(help);
    return res.status(201).json({message: 'Feedback creato con successo'});
  }
  catch(err){
    console.log(err.message);
    return res.status(500).json({message: 'Errore del server'});
  }
}
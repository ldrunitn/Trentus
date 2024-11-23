const mongoose = require('mongoose');
const Servizio = require('../model/servizio.model');
exports.createForm = async (req,res) => {
  //recupero l'array di stringhe (opzioni)
  const { options } = req.body;
  if(!options){
    return res.status(400).json({message: "Opzioni non presenti; impossibile creare la form"});
  }
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).json({message: 'ID non valido'});
  }
  try{
    let service = await Servizio.findById(req.params.id);
    //creo le opzioni
    let opzioniForm = [];
    options.forEach(t => {
      opzioniForm.push({
        testo: t,
        check: false,
        tipo: 'check'
      })
    });
    // ora lo metto nel campo 'opzioniForm' del servizio
    service.opzioniForm = opzioniForm;
    // in fine lo salvo
    await service.save();
    return res.status(201).json({message: 'Form creata con successo'});
  }
  catch(err){
    console.log(err.message);
    return res.status(500).json({message: 'Errore del server'});
  }
}
exports.getForm = async (req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).json({message: 'ID non valido'});
  }
  // ottengo la form di uno specifico servizio
  try{
    let form = await Servizio.findById(req.params.id).select('opzioniForm');
    if(!form){
      return res.status(404).json({message:'Form non trovata'});
    }
    return res.status(200).json(form);
  }
  catch(err){
    return res.status(500).json({message:'Errore del server'});
  }

}
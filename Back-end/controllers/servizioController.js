const GdS = require('../model/gds.model');
const Servizio = require('../model/servizio.model');
const mongoose = require('mongoose');
exports.createService = async (request, session) => {
  //creo il servizio
  const servizio = new Servizio({
    titolo: request['titolo'],
    azienda: request['azienda'],
    url: request['url'],
    foto: request['foto'],
    descrizione: request['descrizione']
  });
  const service_id = await servizio.save({session}); //salvo il servizio ottenendo l'id
  return service_id;
}
exports.getService = async (req,res) => {
  id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message: 'ID non valido'});
  }
  try{
    let s = await Servizio.findById(id);
    return res.status(200).json(s);
  } 
  catch(err){
    return res.status(500).json({message: "Errore del server"});
  }
}
exports.getServiceByGdSId = async (req,res) =>{
  id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID non valido' });
  }
  try{
    const result = await GdS.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) } // Filtra il gds con l'ID specifico
      },
      {
        $project:{
          passwordHash: 0
        },
      },
      {
        
        $lookup: {
          from: 'services', // Nome della collezione "secondaria"
          localField: 'servizio', // Campo nella collezione principale
          foreignField: '_id', // Campo nella collezione "secondaria"
          as: 'servizi' // Nome dell'array con i dati uniti
        }
        
      }
    ]);
    if(!result){
      return res.status(404).json({ message: 'Servizio non trovato'});
    }
    return res.status(200).json({servizio: result[0].servizi});
  }catch(err){
    console.log(err.message);
    return res.status(500).json({message: 'Errore del server'});
  }
}
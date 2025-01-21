// Models
const GdS = require('../models/gds.model');
const Servizio = require('../models/servizio.model');

// Crea un servizio
exports.creaServizio = async (request, session) => {
  const servizio = new Servizio({
    titolo: request['titolo'],
    azienda: request['azienda'],
    url: request['url'],
    foto: request['foto'],
    descrizione: request['descrizione'],
    stato: "on"
  });
  const service_id = await servizio.save({session}); //salvo il servizio ottenendo l'id
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

// Modifica stato servizio
exports.modificaStato = async (req, res) => {
  try {
    let servizio = await Servizio.findById(req.servizio_id);
    
    servizio.stato = servizio.stato === "on" ? "off" : "on";

    await servizio.save();

    return res.status(201).json({message: 'servizio ora ' + servizio.stato});
  } catch (error) {
    return res.status(500).json({ message: "Errore nel modificare lo stato", error: error.message });
  }
};
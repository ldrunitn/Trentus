const Servizio = require('../model/servizio.model');
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
const mongoose = require('mongoose');

// Model
const Avviso = require('../models/avviso.model');

// Crea un avviso
exports.createAvviso = async (req,  res) => {
    //creo il servizio
    const { titolo, contenuto, tipo, inizio, fine, servizio_id } = req.body;
    const avviso = new Avviso({
      titolo,
      contenuto,
      tipo,
      inizio: new Date(inizio),
      fine: new Date(fine),
      servizio_id
    });
    const avviso_id = await avviso.save(); //salvo il servizio ottenendo l'id
    res.status(201).json({message: "Avviso creato correttamente"});
    return avviso_id;
}
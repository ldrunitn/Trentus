const mongoose = require('mongoose');
const schemaOpzione = require('./opzione.schema');

const schemaServizio = new mongoose.Schema({
  titolo: {
    type: String,
    required: [true, "Il titolo è obbligatorio"],
    maxlength: [64, "Il titolo può avere massimo 64 caratteri"]
  },
  azienda: {
    type: String,
    required: [true, "Il nome dell'azienda è obbligatorio"],
    maxlength: [64, "Il nome dell'azienda può avere massimo 64 caratteri"]
  },
  url: {
    type: String,
    required: false,
    maxlength: [255, "Il contenuto può avere massimo 255 caratteri"]
  },
  foto: {
    type: String,
    required: true
  },
  descrizione: {
    type: String,
    required: false,
    maxlength: [255, "Il contenuto può avere massimo 255 caratteri"]
  },
  opzioniForm: {
    type: [schemaOpzione.schemaOpzioneSingola],
    required: [false, "È necessario fornire un lista di opzioni"]
  },
}, {
  timestamps: true // Per aggiungere automaticamente campi createdAt e updatedAt
});

module.exports = schemaServizio
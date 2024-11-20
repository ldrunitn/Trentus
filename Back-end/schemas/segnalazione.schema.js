const mongoose = require('mongoose');
const schemaOpzione = require('./opzione.schema');

const schemaSegnalazione = new mongoose.Schema({
  titolo: {
    type: String,
    required: [true, "Il titolo è obbligatorio"],
    maxlength: [64, "Il titolo può avere massimo 64 caratteri"]
  },
  opzioni: {
    type: [schemaOpzione],
    required: [true, "È necessario fornire un lista di opzioni"]
  },
  commento: {
    type: String,
    required: false,
    maxlength: [255, "Il contenuto può avere massimo 255 caratteri"]
  },
  utente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utente',
    required: false
  },
  servizio_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servizio',
    required: false
  }
}, {
  timestamps: true // Per aggiungere automaticamente campi createdAt e updatedAt
});

module.exports = schemaSegnalazione;
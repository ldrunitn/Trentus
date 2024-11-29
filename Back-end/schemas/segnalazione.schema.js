const mongoose = require('mongoose');
const schemaOpzione = require('./opzione.schema');

const schemaSegnalazione = new mongoose.Schema({
  opzioni: {
    type: [schemaOpzione.schemaOpzioneSingola],
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
    required: true
  },
  servizio_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servizio',
    required: true
  }
}, {
  timestamps: true // Per aggiungere automaticamente campi createdAt e updatedAt
});

module.exports = schemaSegnalazione;
const mongoose = require('mongoose');
const schemaUtente = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'L\'email è obbligatoria'], // Campo obbligatorio con messaggio di errore
    unique: true, // Garantisce l'unicità dell'email
    match: [/.+\@.+\..+/, 'Inserire un indirizzo email valido'] // Valida il formato dell'email
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Per aggiungere automaticamente campi createdAt e updatedAt
});

const Utente = mongoose.model('Utente', schemaUtente);
module.exports = Utente;
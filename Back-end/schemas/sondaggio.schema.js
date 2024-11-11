const mongoose = require('mongoose');
const schemaOpzione = require('./opzione.schema');

const schemaServizio = new mongoose.Schema({
  titolo: {
    type: String,
    required: [true, "Il titolo è obbligatorio"],
    maxlength: [64, "Il titolo può avere massimo 64 caratteri"]
  },
  opzioni: { //potranno essere opzioni singole, oppure opzioni con "domanda" e risposte
    items: [{
      type: {
        type: String,  // Differenziamo i due tipi
        enum: [schemaOpzione.schemaOpzioneSingola, schemaOpzione.schemaRaccoltaOpzioni],
        required: true
      },
    }]
  }
}, {
  timestamps: true // Per aggiungere automaticamente campi createdAt e updatedAt
});

const Servizio = mongoose.model('Servizio', schemaServizio);
module.exports = Servizio;
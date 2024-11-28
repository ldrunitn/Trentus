const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schemaGdS = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'L\'email è obbligatoria'], // Campo obbligatorio con messaggio di errore
    unique: true, // Garantisce l'unicità dell'email
    match: [/.+\@.+\..+/, 'Inserire un indirizzo email valido'] // Valida il formato dell'email
  },
  passwordHash: {
    type: String,
    required: true
  },
  servizio:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service',
    required: true
  }
}, {
  timestamps: true // Per aggiungere automaticamente campi createdAt e updatedAt
});

schemaGdS.methods.comparePassword = async function(passwordCandidata){
  console.log(`${passwordCandidata}: ${this.passwordHash}`)
  return bcrypt.compare(passwordCandidata, this.passwordHash);
}

module.exports = schemaGdS;
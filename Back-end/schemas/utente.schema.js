const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

// Middleware per hashare le password
// schemaUtente.pre('save', async function (next) {
//   if (!this.isModified('passwordHash')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
//   next();
// });

//metodo per confrontare le password
schemaUtente.methods.comparePassword = async function(passwordCandidata){
  console.log(`${passwordCandidata}: ${this.passwordHash}`)
  return bcrypt.compare(passwordCandidata, this.passwordHash);
}

const Utente = mongoose.model('Utente', schemaUtente);
module.exports = Utente;
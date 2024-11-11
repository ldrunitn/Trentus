const mongoose = require('mongoose');
const schemaAvviso = new mongoose.Schema({
  titolo: {
    type: String,
    required: [true, "Il titolo è obbligatorio"],
    minlength: [5, "Il titolo deve avere mino 5 caratteri"],
    maxlength: [64, "Il titolo può avere massimo 64 caratteri"]
  },
  contenuto: {
    type: String,
    required: [true, "Il contenuto è obbligatorio"],
    minlength: [5, "Il contenuto deve avere minimo 5 caratteri"],
    maxlength: [255, "Il contenuto può avere massimo 255 caratteri"]
  },
  tipo: {
    type: String,
    enum:['manutenzione','problemi','down'],
    required: true
  },
  inizio: {
    type: Date,
    required: false,
    validate:{
      validator: function(value){ //controlla che la data inserita non sia nel passato
        return value <= new Date();
      }
    }
  },
  fine: {
    type: Date,
    required: false,
    validate:{
      validator: function(value){ //controlla che la data inserita non sia nel passato
        return value <= new Date();
      }
    }
  },
  servizio_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servizio',
    required: true
  }
}, {
  timestamps: true // Per aggiungere automaticamente campi createdAt e updatedAt
});

const Avviso = mongoose.model('Avviso', schemaAvviso);
module.exports = Avviso;
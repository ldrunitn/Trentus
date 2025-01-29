const mongoose = require('mongoose');

const schemaAvviso = new mongoose.Schema({
  titolo: {
    type: String,
    required: [true, "Il titolo è obbligatorio"],
    minlength: [5, "Il titolo deve avere mino 5 caratteri"],
    maxlength: [64, "Il titolo può avere massimo 64 caratteri"]
  },
  corpo: {
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
        return value >= new Date();
      },
      message: "La data di inizio non deve essere nel passato"
    }
  },
  fine: {
    type: Date,
    required: false,
    validate: {
      validator: function(value) {
          return value > this.inizio; // Verifica che 'fine' sia dopo 'inizio'
      },
      message: "La data di fine deve essere successiva alla data di inizio."
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

module.exports = schemaAvviso;
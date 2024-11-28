const mongoose = require('mongoose');

const schemaOpzioneSingola = new mongoose.Schema({ //l'opzione può essere una checkbox o un radio button
  testo: {
    type: String,
    maxlength: [128, "L'opzione può avere al massimo 128 caratteri"],
    required: [true, "Il testo è obbligatorio"]
  },
  check:{
    type: Boolean,
    required: true,
    default: false
  },
  tipo:{
    type: String,
    enum: ['radio','check'],
    required: true
  }
})

const schemaRaccoltaOpzioni = new mongoose.Schema({ //domanda con serie di potenziali risposte
  testo: {
    type: String,
    maxlength: [255, "Il testo può avere massimo 255 caratteri"],
    required: [true, "Il testo è obbligatorio"]
  },
  opzioni: {
    type: [schemaOpzioneSingola],
    required: true
  }
})

module.exports = {
  schemaOpzioneSingola,
  schemaRaccoltaOpzioni
};
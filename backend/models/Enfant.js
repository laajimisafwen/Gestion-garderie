const mongoose = require('mongoose');

const enfantSchema = new mongoose.Schema({
    username: { type: String, required: true },
    parent: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent' // Modèle parent
    } ,
    subscription: { type: Boolean, default: false },
    groupe: {type: String, default: 'A'},
    naissance: { type: Date, required: true },
    health: { type: Boolean, require: true, default: false },
    medecin: { type: String, require: false, default: null }
});

const Enfant = mongoose.model('Enfant', enfantSchema);

module.exports = Enfant;

const mongoose = require('mongoose');

const evenementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    time: { type: Date, required: true },
    inscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inscription' }],
    prix: { type: String, require: false, default: null }
});

const Evenement = mongoose.model('Evenement', evenementSchema);

module.exports = Evenement;

const mongoose = require('mongoose');

const responsableSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    groupe: {type: String, default: 'A'},
    password: { type: String, required: true },
});

const Responsable = mongoose.model('Responsable', responsableSchema);

module.exports = Responsable;
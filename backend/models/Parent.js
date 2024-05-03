const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    access: { type: Boolean, default: false },
    enfants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enfant' }],
    avis: { type: Number, required: false, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;

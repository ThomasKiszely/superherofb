const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    note: { type: String, required: true },
});

module.exports = mongoose.model('Favorite', favoriteSchema, 'favorites');
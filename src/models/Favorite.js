const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    note: { type: String, required: true },
});

module.exports = mongoose.model('Favorite', favoriteSchema, 'favorites');
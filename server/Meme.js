const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Meme', memeSchema);

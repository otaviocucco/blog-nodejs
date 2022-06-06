const mongoose = require('mongoose');

// cria o schema do banco de dados
const postSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    click: { type: Number, default: 0 },
    createAt: { type: Date, default: Date.now }
});

// cria o modelo do banco de dados
module.exports = mongoose.model('Post', postSchema);
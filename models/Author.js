const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Author', authorSchema);
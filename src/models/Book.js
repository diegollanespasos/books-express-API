const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Book', BookSchema);
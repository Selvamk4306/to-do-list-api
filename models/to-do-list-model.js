const mongoose = require('mongoose');

const tdsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: [String],
        required: false
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ToDo', tdsSchema);
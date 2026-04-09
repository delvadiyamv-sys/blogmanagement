const { link } = require('fs');
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    link: {
        type: String,
        required: true
    }   
});
module.exports = mongoose.model('Ad', adSchema);
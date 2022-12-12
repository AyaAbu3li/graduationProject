const mongoose = require('mongoose');
var validator = require('validator')

const Service = mongoose.model('Service', {
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },

})

module.exports = Service
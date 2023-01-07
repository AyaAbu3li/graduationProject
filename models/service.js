const mongoose = require('mongoose');
var validator = require('validator')

const Service = mongoose.model('Service', {
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    salon: {
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
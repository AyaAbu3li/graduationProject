const mongoose = require('mongoose');

const Rating = mongoose.model('Rating', {
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    salonEmail: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },

})

module.exports = Rating
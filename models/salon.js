const mongoose = require('mongoose');

const salonSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 4
       },
    email: {
        type: String,
        unique: true,
        required: true,
       },
    picture: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String
    },
    city: {
        type: String,
        required: true,
    },
    googlemaps: {
        type: String
    },
}, {
    timestamps: true
})

const Salon = mongoose.model('Salon', salonSchema)

module.exports = Salon
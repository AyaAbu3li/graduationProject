const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema( { 
role: {
    type: Number,
    default: 0
}, // 0 => upconig , 1 => history
PersonName: {
    type: String,
    required: true
},
phoneNumber: {
    type: String,
    required: true
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
},
SalonName: {
    type: String,
},
serviceName: {
    type: String,
},
date: {
    type: Date,
},
price: {
    type: String,
    required: true,
},
time: {
    type: String,
    required: true,
},
}, {
    timestamps: true
})

const Booking = mongoose.model('Booking', bookingSchema )

module.exports = Booking
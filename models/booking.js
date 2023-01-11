const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema( { 
role: {
    type: Number,
    default: 0
},
// 0  => upcomig      
// 1  => history approved
// 10 => history not approved
// 11 => history Canceld
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
SalonEmail: {
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
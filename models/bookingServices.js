const mongoose = require('mongoose');

const bookingServicesSchema = new mongoose.Schema( { 
salonEmail: {
    type: String,
    required: true
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
},
service: {
    type: String,
    required: true
},
}, {
    timestamps: true
})

const bookingServices = mongoose.model('bookingServices', bookingServicesSchema )

module.exports = bookingServices
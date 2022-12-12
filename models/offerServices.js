const mongoose = require('mongoose');

const offerServicesSchema = new mongoose.Schema( { 
salonname: {
    type: String,
    required: true
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Offer'
},
service: {
    type: String,
    required: true
},
}, {
    timestamps: true
})

const offerServices = mongoose.model('offerServices', offerServicesSchema )

module.exports = offerServices
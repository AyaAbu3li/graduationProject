const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema( { 

name: {
    type: String,
    required: true
},
message: {
    type: String,
    required: true
},
owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
},
picture: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
phone: {
    type: Number,
    required: true
},
}, {
    timestamps: true
})

const Message = mongoose.model('Message', offerSchema )

module.exports = Message
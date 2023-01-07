const mongoose = require('mongoose');
const OfferService = require('./offerServices');

const offerSchema = new mongoose.Schema( { 
role: {
    type: Number,
    default: 0
},
salonname: {
    type: String,
    required: true
},
name: {
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
},
startdate: {
    type: String,
},
enddate: {
    type: String,
},
price: {
    type: Number,
    required: true,
},
}, {
    timestamps: true
})

offerSchema.virtual('offerServices',{
        ref: 'offerServices',
        localField: '_id',
        foreignField: 'owner'
    })

    offerSchema.pre('remove', async function(next){
    const offer = this
    await OfferService.deleteMany({ owner: offer._id })
    next()
})


const Offer = mongoose.model('Offer', offerSchema )

module.exports = Offer
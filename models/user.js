const mongoose = require('mongoose');
var validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Offer = require('./offer');
const Booking = require('./booking');
const Message = require('./message');

const userSchema = new mongoose.Schema( {
    role: {
        type: Number,
        default: 0
       },
    name: {
     type: String,
     required: true
    },
    picture: {
        type: String,
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    phone: {
        type: Number 
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
    }, {
        timestamps: true
    })
    userSchema.virtual('offers',{
        ref: 'Offer',
        localField: '_id',
        foreignField: 'owner'
    })

    userSchema.virtual('messages',{
        ref: 'Message',
        localField: '_id',
        foreignField: 'owner'
    })

    userSchema.virtual('bookings',{
        ref: 'Booking',
        localField: '_id',
        foreignField: 'owner'
    })

    userSchema.methods.toJSON = function() {

        const user = this
        const userObject = user.toObject()

        delete userObject.password
        delete userObject.tokens

        return userObject
    }

    userSchema.methods.generateAuthToken = async function() {

        const user = this
        const token = jwt.sign({_id:user._id.toString()},'thisisnewuser')
      user.tokens =  user.tokens.concat({ token })
      await user.save()
        return token
    }


    userSchema.statics.findByCredentials = async (email,password) => {
        const user = await User.findOne({ email })
        if(!user) {
        throw new Error('Unable to login')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
        throw new Error('Unable to login')
        }
        return user
    }


    userSchema.pre('save', async function(next){
        const user = this

        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 8)
        }

        next()
    })

    userSchema.pre('remove', async function(next){
        const user = this
        await Offer.deleteMany({ owner: user._id })
        next()
    })

    userSchema.pre('remove', async function(next){
        const user = this
        await Booking.deleteMany({ owner: user._id })
        next()
    })

    userSchema.pre('remove', async function(next){
        const user = this
        await Message.deleteMany({ owner: user._id })
        next()
    })


const User = mongoose.model('User', userSchema)

module.exports = User
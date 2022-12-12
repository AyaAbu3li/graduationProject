const mongoose = require('mongoose');

const whoAreWeSchema = new mongoose.Schema( {
    name: {
        type: String,
    },
    email: {
        type: String,
       },
    picture: {
        type: String,
    },
    phone: {
        type: Number,
    },
    whoAreWe: {
        type: String,
    },
    WhatSetsUsApart: {
        type: String
    },
}, {
    timestamps: true
})

const whoAreWe = mongoose.model('whoAreWe', whoAreWeSchema)

module.exports = whoAreWe
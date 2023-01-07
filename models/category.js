const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema( {
    category: {
        type: String,
    },
}, {
    timestamps: true
})

const category = mongoose.model('category', categorySchema)

module.exports = category
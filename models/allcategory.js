const mongoose = require('mongoose');

const AllcategorySchema = new mongoose.Schema( {
    category: {
        type: String,
    },
}, {
    timestamps: true
})

const allcategory = mongoose.model('allcategory', AllcategorySchema)

module.exports = allcategory
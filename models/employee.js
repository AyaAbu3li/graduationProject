const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    salonname: {
        type: String
    },
}, {
    timestamps: true
})

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee
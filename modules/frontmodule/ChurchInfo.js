const mongoose = require('mongoose');

const ChurchInfoSchema = new mongoose.Schema({
    head : {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
});

module.exports = mongoose.model('ChurchInfo', ChurchInfoSchema);
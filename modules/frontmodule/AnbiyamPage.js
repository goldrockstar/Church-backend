const mongoose = require('mongoose');

// Anbiyam Page Schema-வை வரையறுக்கவும்
const anbiyamSchema = new mongoose.Schema({
    heroSection: {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    anbiyamsListSection: [{
        id: { type: Number, required: true },
        title: { type: String, required: true },
        imageSrc: { type: String, required: true },
        link: { type: String, required: true },
        head: { type: String, required: true },
        content: { type: String, required: true },
    }],
});


const AnbiyamPage = mongoose.model('AnbiyamPage', anbiyamSchema);

module.exports = AnbiyamPage;

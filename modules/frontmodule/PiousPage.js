const mongoose = require('mongoose');

// Schema for individual members
const memberSchema = new mongoose.Schema({
    role: { type: String, required: true },
    name: { type: String, required: true }
});

// Schema for the sections (e.g., பங்குப்பேரவை, பாடகர் குழு)
const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    members: { type: [memberSchema], required: true },
});

// Schema for the entire Pious Movements page
const piousPageSchema = new mongoose.Schema({
    header: {
        title: { type: String, required: true },
        verse: {
            text: { type: String, required: true },
            reference: { type: String, required: true }
        }
    },
    sections: {
        type: [sectionSchema],
        required: true
    },
    footer: {
        churchName: { type: String, required: true },
        developerInfo: {
            text: { type: String, required: true },
            company: { type: String, required: true },
            location: { type: String, required: true }
        }
    }
}, { timestamps: true });

const PiousPage = mongoose.model('PiousPage', piousPageSchema);

module.exports = PiousPage;
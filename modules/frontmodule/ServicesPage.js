const mongoose = require('mongoose');

// weeklyServices மற்றும் monthlyServices-க்கான துணை ஸ்கீமா
const serviceItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    reference: { type: String, required: true },
    image: { type: String, required: true }
});

const servicesPageSchema = new mongoose.Schema({
    heroSection: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        reference : { type: String, required: true }
    },
    servicesListSection: {
        weeklyServices: {
            type: [serviceItemSchema],
            required: true
        },
        monthlyServices: {
            type: [serviceItemSchema],
            required: true
        }
    }
}, { timestamps: true });

const ServicesPage = mongoose.model('ServicesPage', servicesPageSchema);

// Corrected: `ServicesPage` மாடலை சரியாக ஏற்றுமதி செய்யவும்
module.exports = ServicesPage;
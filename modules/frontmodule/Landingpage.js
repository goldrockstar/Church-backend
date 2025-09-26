// models.js
const mongoose = require('mongoose');

// --- Each section's Schema based on your router and data structure ---

// Schema for the Hero Section
const heroSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    backgroundImage: { type: String, required: true },
});

const readmoreSchema = new mongoose.Schema({
    title: {type : String, required: true},
    content : {type : String, required: true},
})

// Schema for the Event Section
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    datetime: { type: String, required: true },
    location: { type: String, required: true },
});

const foundationSchema = new mongoose.Schema({
    title: {type : String, required: true},
    datetime : {type : String, required: true},
    image : {type : String, required: true},
    location : {type : String, required: true},
    time : {type : String, required: true},
    description : {type : String, required: true},
})

// Sub-Schema for a single Priest within the priestsList array
const priestItemSchema = new mongoose.Schema({
    // ID is used for unique identification, as per your router
    id: { type: String, required: true, unique: true }, 
    nameTamil: { type: String, required: true },
    titleTamil: { type: String, required: true },
    image: { type: String, required: true }, // URL to the image
});

// Schema for the Priests Section, which contains the array of priests
const priestsSectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    backgroundImage: { type: String, required: true },
    // This array holds the priestItemSchema objects
    priestsList: [priestItemSchema], 
});

// Schema for the Bible Section
const bibleSchema = new mongoose.Schema({
    image: { type: String, required: true },
    quote: { type: String, required: true },
    reference: { type: String, required: true },
});

// Schema for the Anbiyam Section
const anbiyamSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }, // URL to the image
    quote: { type: String, required: true },
    reference: { type: String, required: true },
});

// Schema for the PrayEvent Section
const prayEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    backgroundImage: { type: String, required: true },
    quote: { type: String, required: true },
    reference: { type: String, required: true },
});

// Schema for the Contact Section
const contactSchema = new mongoose.Schema({
    title: { type: String, required: true },
    backgroundImage: { type: String, required: true },
    contactbtn: { type: String, required: true },
});

// Schema for the Footer Section, simplified to match your router's data
const footerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: { type: String, required: true },
});

// Schema for a single Inbox Message
const inboxMessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

// Create Mongoose models
const Hero = mongoose.model('Hero', heroSchema);
const Readmore = mongoose.model('Readmore', readmoreSchema);
const Event = mongoose.model('Event', eventSchema);
const Foundation = mongoose.model('Foundation', foundationSchema);
const PriestsSection = mongoose.model('PriestsSection', priestsSectionSchema);
const Bible = mongoose.model('Bible', bibleSchema);
const Anbiyam = mongoose.model('Anbiyam', anbiyamSchema);
const PrayEvent = mongoose.model('PrayEvent', prayEventSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Footer = mongoose.model('Footer', footerSchema);
const InboxMessage = mongoose.model('InboxMessage', inboxMessageSchema);


// Export all models for use in your routes
module.exports = { Hero, Readmore , Event, Foundation ,PriestsSection, Bible, Anbiyam, PrayEvent, Contact, Footer, InboxMessage };

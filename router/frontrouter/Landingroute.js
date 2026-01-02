const express = require('express');
const router = express.Router();
const Event = require('../../modules/frontmodule/Landingpage').Event;
const Vasagam = require('../../modules/frontmodule/Landingpage').Vasagam;
const Foundation = require('../../modules/frontmodule/Landingpage').Foundation;
const Readmore = require('../../modules/frontmodule/Landingpage').Readmore;
const Hero = require('../../modules/frontmodule/Landingpage').Hero;
const PriestsSection = require('../../modules/frontmodule/Landingpage').PriestsSection;
const Bible = require('../../modules/frontmodule/Landingpage').Bible;
const Anbiyam = require('../../modules/frontmodule/Landingpage').Anbiyam;
const PrayEvent = require('../../modules/frontmodule/Landingpage').PrayEvent;
const Contact = require('../../modules/frontmodule/Landingpage').Contact;
const Footer = require('../../modules/frontmodule/Landingpage').Footer;

router.get('/:section', async (req, res) => {
    const { section } = req.params;
    try {
        let data;
        switch(section) {
            case 'hero': data = await Hero.findOne({}); break;
            case 'readmore': data = await Readmore.findOne({}); break;
            case 'event': data = await Event.findOne({}); break;
            case 'vasagam': data = await Vasagam.findOne({}); break;
            case 'foundation': data = await Foundation.findOne({}); break;
            case 'priests': data = await PriestsSection.findOne({}); break;
            case 'bible': data = await Bible.findOne({}); break;
            case 'anbiyam': data = await Anbiyam.findOne({}); break;
            case 'prayevent': data = await PrayEvent.findOne({}); break;
            case 'contact': data = await Contact.findOne({}); break;
            case 'footer': data = await Footer.findOne({}); break;
            default: return res.status(404).send('Invalid section');
        }
        if (data) {
            res.json(data);
        } else {
            res.status(404).send(`${section} data not found`);
        }
    } catch (error) {
        console.error(`Error fetching ${section} data:`, error);
        res.status(500).send(`Error fetching ${section} data`);
    }
});

// --- ADMIN ROUTES ---

// அனைத்துப் பிரிவுக்கான POST ரூட் (தரவை உருவாக்க)
router.post('/admin/hero', async (req, res) => {
    const newHeroData = req.body;

    // backgroundImages இருக்கிறதா என்றும் செக் செய்யலாம்
    if (!newHeroData || !newHeroData.title || !newHeroData.description) {
        return res.status(400).send('Hero title and description are required.');
    }

    try {
        // findOneAndUpdate({}) என்பது ஏற்கனவே இருக்கும் டேட்டாவை மாற்றிவிடும் (Upsert: true)
        const result = await Hero.findOneAndUpdate({}, newHeroData, { new: true, upsert: true });
        res.status(201).json({ message: 'Hero section created Successfully', data: result });
    } catch (error) {
        console.error('Error creating hero data:', error);
        res.status(500).send('Failed to create hero section data.');
    }
});

router.post('/admin/readmore', async (req, res) => {
    const newReadMoreData = req.body;
    if (!newReadMoreData || !newReadMoreData.title || !newReadMoreData.content) {
        return res.status(400).send('ReadMore title and content are required.');
    }
    try {
        const result = await Readmore.findOneAndUpdate({}, newReadMoreData, { new: true, upsert: true });
        res.status(201).json({ message: 'ReadMore section created Successfully', data: result });
    } catch (error) {
        console.error('Error creating readmore data:', error);
        res.status(500).send('Failed to create readmore section data.');
    }
});

router.post('/admin/event', async (req, res) => {
    const newEventData = req.body;
    if (!newEventData || !newEventData.title || !newEventData.datetime || !newEventData.location) {
        return res.status(400).send('Event title, datetime, and location are required.');
    }
    try {
        const result = await Event.findOneAndUpdate({}, newEventData, { new: true, upsert: true });
        res.status(201).json({ message: 'Event section created Successfully', data: newEventData });
    } catch (error) {
        console.error('Error creating event data:', error);
        res.status(500).send('Failed to create event section data.');
    }
});

router.post('/admin/vasagam', async (req, res) => {
    const newvasagamData = req.body;

    // backgroundImages இருக்கிறதா என்றும் செக் செய்யலாம்
    if (!newvasagamData || !newvasagamData.title || !newvasagamData.description || !newvasagamData.reference || !newvasagamData.images) {
        return res.status(400).send('Vasagam title and description and reference and images are required.');
    }

    try {
        const result = await Vasagam.findOneAndUpdate({}, newvasagamData, { new: true, upsert: true });
        res.status(201).json({ message: 'Vasagam section created Successfully', data: result });
    } catch (error) {
        console.error('Error creating vasagam data:', error);
        res.status(500).send('Failed to create vasagam section data.');
    }
});

router.post('/admin/foundation', async (req, res) => {
    const newFoundationData = req.body;
    if (!newFoundationData || !newFoundationData.title || !newFoundationData.datetime || !newFoundationData.image || !newFoundationData.location || !newFoundationData.time || !newFoundationData.description) {
        return res.status(400).send('Foundation title, datetime, image, location, time, and description are required.');
    }
    try {
        const result = await Foundation.findOneAndUpdate({}, newFoundationData, { new: true, upsert: true });
        res.status(201).json({ message: 'Foundation section created Successfully', data: newFoundationData });
    } catch (error) {
        console.error('Error creating foundation data:', error);
        res.status(500).send('Failed to create foundation section data.');
    }
})
router.post('/admin/priests', async (req, res) => {
    const newPriestsData = req.body;
    if (!newPriestsData || !newPriestsData.title || !newPriestsData.backgroundImage || !newPriestsData.priestsList) {
        return res.status(400).send('Invalid data format. "title", "backgroundImage", and "priestsList" are required.');
    }
    if (!Array.isArray(newPriestsData.priestsList) || newPriestsData.priestsList.length === 0) {
        return res.status(400).send('"priestsList" must be a non-empty array.');
    }
    const isValid = newPriestsData.priestsList.every(priest =>
        priest.id && priest.image && priest.nameTamil && priest.titleTamil
    );
    if (!isValid) {
        return res.status(400).send('Each priest object must have "id", "image", "nameTamil", and "titleTamil".');
    }
    try {
        const result = await PriestsSection.findOneAndUpdate({}, newPriestsData, { new: true, upsert: true });
        res.status(201).json({ message: 'Priests section created successfully', data: result });
    } catch (error) {
        console.error('Error creating priests data:', error);
        res.status(500).send('Failed to create priests section data.');
    }
});

router.post('/admin/anbiyam', async (req, res) => {
    const newAnbiyamData = req.body;
    if (!newAnbiyamData || !newAnbiyamData.title || !newAnbiyamData.image || !newAnbiyamData.quote || !newAnbiyamData.reference) {
        return res.status(400).send('Anbiyam title, image, quote, and reference are required.');
    }
    try {
        const result = await Anbiyam.findOneAndUpdate({}, newAnbiyamData, { new: true, upsert: true });
        res.status(201).json({ message: 'Anbiyam section created Successfully', data: result });
    } catch (error) {
        console.error('Error creating anbiyam data:', error);
        res.status(500).send('Failed to create anbiyam section data.');
    }
});

router.post('/admin/bible', async (req, res) => {
    const newBibleData = req.body;
    if (!newBibleData || !newBibleData.image || !newBibleData.quote || !newBibleData.reference) {
        return res.status(400).send('Bible image, quote, and reference are required.');
    }
    try {
        const result = await Bible.findOneAndUpdate({}, newBibleData, { new: true, upsert: true });
        res.status(201).json({ message: 'Bible section created Successfully', data: result });
    } catch (error) {
        console.error('Error creating bible data:', error);
        res.status(500).send('Failed to create bible section data.');
    }
});

router.post('/admin/prayevent', async (req, res) => {
    const newPrayEventData = req.body;
    if (!newPrayEventData || !newPrayEventData.title || !newPrayEventData.quote || !newPrayEventData.reference) {
        return res.status(400).send('PrayEvent title, quote, and reference are required.');
    }
    try {
        const result = await PrayEvent.findOneAndUpdate({}, newPrayEventData, { new: true, upsert: true });
        res.status(201).json({ message: 'PrayEvent section created Successfully', data: result });
    } catch (error) {
        console.error('Error creating prayevent data:', error);
        res.status(500).send('Failed to create prayevent section data.');
    }
});

router.post('/admin/contact', async (req, res) => {
    const newContactData = req.body;
    if (!newContactData || !newContactData.title || !newContactData.backgroundImage || !newContactData.contactbtn) {
        return res.status(400).send('Contact title, image, and contact-btn are required.');
    }
    try {
        const result = await Contact.findOneAndUpdate({}, newContactData, { new: true, upsert: true });
        res.status(201).json({ message: 'Contact section created Successfully', data: result });
    } catch (error) {
        console.error('Error creating contact data:', error);
        res.status(500).send('Failed to create contact section data.');
    }
});

router.post('/admin/footer', async (req, res) => {
    const newFooterData = req.body;
    if (!newFooterData || !newFooterData.title || !newFooterData.address) {
        return res.status(400).send('Footer title and address are required.');
    }
    try {
        const result = await Footer.findOneAndUpdate({}, newFooterData, { new: true, upsert: true });
        res.status(201).json({ message: 'Footer section created Successfully', data: result });
    } catch (error) {
        console.error('Error creating footer data:', error);
        res.status(500).send('Failed to create footer section data.');
    }
});

// அனைத்துப் பிரிவுக்கான PUT ரூட் (தரவைப் புதுப்பிக்க)
router.put('/admin/:section', async (req, res) => {
    const { section } = req.params;
    const newData = req.body;
    try {
        let updatedData;
        switch (section) {
            case 'hero': updatedData = await Hero.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            case 'readmore': updatedData = await Readmore.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            case 'event': updatedData = await Event.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            case 'vasagam': updatedData = await Vasagam.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            case 'foundation' : updatedData = await Foundation.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            case 'priests': updatedData = await PriestsSection.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            case 'bible': updatedData = await Bible.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            case 'anbiyam': updatedData = await Anbiyam.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            case 'prayevent': updatedData = await PrayEvent.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            case 'contact': updatedData = await Contact.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            case 'footer': updatedData = await Footer.findOneAndUpdate({}, newData, { new: true, upsert: true }); break;
            default: return res.status(400).send('Invalid section');
        }
        res.json({ message: `${section} updated successfully`, data: updatedData });
    } catch (error) {
        console.error(`Error updating ${section} data:`, error);
        res.status(500).send(`Failed to update ${section} data`);
    }
});

// பிரீஸ்ட்டை நீக்க DELETE ரூட்
router.delete('/admin/:section/:id', async (req, res) => {
    const { section ,id } = req.params;
    try {
        let deletedData;
        switch (section) {
            case 'hero': deletedData = await Hero.findOneAndDelete(); break;
            case 'readmore': deletedData = await Readmore.findOneAndDelete(); break;
            case 'event': deletedData = await Event.findOneAndDelete(); break;
            case 'vasagam': deletedData = await Vasagam.findOneAndDelete(); break;
            case 'foundation': deletedData = await Foundation.findOneAndDelete(); break;
            case 'priests': deletedData = await PriestsSection.findOneAndDelete(); break;
            case 'bible': deletedData = await Bible.findOneAndDelete(); break;
            case 'anbiyam': deletedData = await Anbiyam.findOneAndDelete(); break;
            case 'prayevent': deletedData = await PrayEvent.findOneAndDelete(); break;
            case 'contact': deletedData = await Contact.findOneAndDelete(); break;
            case 'footer': deletedData = await Footer.findOneAndDelete(); break;
            default: return res.status(400).send('Invalid section');
        }

        if (!deletedData) {
            return res.status(404).json({ message: "Data not found"});
        }

        res.json({ message: `${section} deleted successfully`, data: deletedData });
    } catch (error) {
        console.error(`Error deleting ${section} data:`, error);
        res.status(500).send(`Failed to delete ${section} data`);
    }
});

module.exports = router;

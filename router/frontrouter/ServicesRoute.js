const express = require('express');
const router = express.Router();
const ServicesPage = require('../../modules/frontmodule/ServicesPage');

// POST: Creates or updates the services page data in the database
router.post('/admin/servicespage', async (req, res) => {
    const newServicesPageData = req.body;
    
    // Check top-level properties
    if (!newServicesPageData || !newServicesPageData.heroSection || !newServicesPageData.servicesListSection) {
        return res.status(400).send('heroSection and servicesListSection are required.');
    }

    // Check heroSection properties
    if (!newServicesPageData.heroSection.title || !newServicesPageData.heroSection.description) {
        return res.status(400).send('heroSection must have title and description.');
    }

    // Check servicesListSection properties and array types
    const { servicesListSection } = newServicesPageData;
    if (!Array.isArray(servicesListSection.weeklyServices)) {
        return res.status(400).send('weeklyServices must be an array.');
    }
    if (!Array.isArray(servicesListSection.monthlyServices)) {
        return res.status(400).send('monthlyServices must be an array.');
    }

    // Validate each item in the weeklyServices array
    const isValidWeekly = servicesListSection.weeklyServices.every(item =>
        item.title && item.description && item.image
    );
    if (!isValidWeekly) {
        return res.status(400).send('Each item in weeklyServices must have title, description, and image.');
    }

    // Validate each item in the monthlyServices array
    const isValidMonthly = servicesListSection.monthlyServices.every(item =>
        item.title && item.description && item.image
    );
    if (!isValidMonthly) {
        return res.status(400).send('Each item in monthlyServices must have title, description, and image.');
    }

    try {
        const result = await ServicesPage.findOneAndUpdate({}, newServicesPageData, { upsert: true, new: true });
        res.status(201).json(result);
    } catch (error) {
        console.error('Error writing servicespage data:', error);
        res.status(500).send('Error writing servicespage data');
    }
});

// GET: Fetches the services page data from the database
router.get('/servicespage', async (req, res) => {
    try {
        const data = await ServicesPage.findOne({});
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Services page data not found');
        }
    } catch (error) {
        res.status(500).send('Error reading servicespage data');
    }
});

// PUT: Updates existing services page data
router.put('/admin/servicespage', async (req, res) => {
    const updatedServicesPageData = req.body;
    try {
        const result = await ServicesPage.findOneAndUpdate({}, updatedServicesPageData, { new: true });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send('Services page data not found.');
        }
    } catch (error) {
        console.error('Failed to update services page data:', error);
        res.status(500).send('Failed to update services page data');
    }
});

// DELETE: Deletes the services page data
router.delete('/admin/servicespage', async (req, res) => {
    try {
        const result = await ServicesPage.findOneAndDelete({});
        if (result) {
            res.status(200).send('Services page data deleted successfully.');
        } else {
            res.status(404).send('Services page data not found.');
        }
    } catch (error) {
        console.error('Failed to delete services page data:', error);
        res.status(500).send('Failed to delete services page data');
    }
});

module.exports = router;
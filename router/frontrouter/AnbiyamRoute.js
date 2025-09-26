const express = require('express');
const router = express.Router();
const AnbiyamPage = require('../../modules/frontmodule/AnbiyamPage');

// GET ரூட் - anbiyampage தரவை பெற
router.get('/anbiyampage', async (req, res) => {
    try {
        const data = await AnbiyamPage.findOne({});
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Anbiyam page data not found');
        }
    } catch (error) {
        console.error('Error reading anbiyampage data:', error);
        res.status(500).send('Error reading anbiyampage data');
    }
});

// POST ரூட் - anbiyampage தரவை உருவாக்க/புதுப்பிக்க
router.post('/admin/anbiyampage', async (req, res) => {
    const newAnbiyamPageData = req.body;
    if (!newAnbiyamPageData || !newAnbiyamPageData.heroSection || !newAnbiyamPageData.anbiyamsListSection ) {
        return res.status(400).send('heroSection, anbiyamsListSection, and readmoreSection are required.');
    }
    if (!newAnbiyamPageData.heroSection.title || !newAnbiyamPageData.heroSection.description ) {
        return res.status(400).send('heroSection must have title and description.');
    }
    if (!Array.isArray(newAnbiyamPageData.anbiyamsListSection)) {
        return res.status(400).send('anbiyamsListSection must be an array.');
    }
    

    const isValidListSection = newAnbiyamPageData.anbiyamsListSection.every(item =>
        item.id && item.title && item.imageSrc && item.link
    );
   

    if (!isValidListSection) {
        return res.status(400).send('Each item in anbiyamsListSection must have id, title, imageSrc, and link.');
    }
    

    try {
        // FindOneAndUpdate with upsert:true to create or update the single document
        const result = await AnbiyamPage.findOneAndUpdate({}, newAnbiyamPageData, {
            new: true,
            upsert: true
        });
        res.status(201).json({ message: 'Anbiyam page data created/updated successfully.', data: result });
    } catch (error) {
        console.error('Error writing anbiyampage data:', error);
        res.status(500).send('Error writing anbiyampage data');
    }
});

// PUT ரூட் - anbiyampage தரவைப் புதுப்பிக்க
router.put('/admin/anbiyampage', async (req, res) => {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).send('Request body cannot be empty.');
    }
    try {
        const updatedData = await AnbiyamPage.findOneAndUpdate({}, data, { new: true });
        if (updatedData) {
            res.status(200).send('Anbiyam page section updated successfully.');
        } else {
            res.status(404).send('Anbiyam page data not found to update.');
        }
    } catch (error) {
        console.error('Error updating anbiyampage section:', error);
        res.status(500).send('Error updating anbiyampage section.');
    }
});

// DELETE ரூட் - anbiyamsListSection-ல் உள்ள ஒரு உருப்படியை நீக்க
router.delete('/admin/anbiyampage/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const document = await AnbiyamPage.findOne({});
        if (!document || !document.anbiyamsListSection) {
            return res.status(404).send('Anbiyampage data or list not found.');
        }

        const initialLength = document.anbiyamsListSection.length;
        document.anbiyamsListSection = document.anbiyamsListSection.filter(item => item.id !== parseInt(id));

        if (document.anbiyamsListSection.length === initialLength) {
            return res.status(404).send(`Item with id ${id} not found.`);
        }

        await document.save();

        res.status(200).send(`Item with id ${id} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Error deleting item.');
    }
});

module.exports = router;

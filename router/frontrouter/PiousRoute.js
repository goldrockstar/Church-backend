const express = require('express');
const router = express.Router();
const PiousPage = require('../../modules/frontmodule/PiousPage'); 


router.post('/admin/piouspage', async (req, res) => {
    const newData = req.body;
    
    if (!newData || !newData.header || !newData.sections || !newData.footer) {
        return res.status(400).send('All top-level fields (header, sections, footer) are required.');
    }

    try {
       
        const result = await PiousPage.findOneAndUpdate({}, newData, { upsert: true, new: true });
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating/updating pious page data:', error);
        res.status(500).send('Server error: Could not save data.');
    }
});

router.get('/piouspage', async (req, res) => {
    try {
        const data = await PiousPage.findOne({});
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Pious page data not found.');
        }
    } catch (error) {
        console.error('Error fetching pious page data:', error);
        res.status(500).send('Server error: Could not fetch data.');
    }
});

router.put('/admin/piouspage', async (req, res) => {
    const updatedData = req.body;
    try {
        const result = await PiousPage.findOneAndUpdate({}, updatedData, { new: true });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send('Pious page data not found.');
        }
    } catch (error) {
        console.error('Failed to update pious page data:', error);
        res.status(500).send('Failed to update pious page data.');
    }
});

router.delete('/admin/piouspage', async (req, res) => {
    try {
        const result = await PiousPage.findOneAndDelete({});
        if (result) {
            res.status(200).send('Pious page data deleted successfully.');
        } else {
            res.status(404).send('Pious page data not found.');
        }
    } catch (error) {
        console.error('Failed to delete pious page data:', error);
        res.status(500).send('Failed to delete pious page data.');
    }
});

module.exports = router;
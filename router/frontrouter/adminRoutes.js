const express = require('express');
const router = express.Router();
const ChurchInfo = require('../../modules/frontmodule/ChurchInfo')
const ContactMessage = require('../../modules/frontmodule/ContactMessage')

// GET request to fetch church info and all contact messages for the admin page
router.get('/admin/data', async (req, res) => {
    try {
        const churchInfo = await ChurchInfo.findOne(); // Assumes only one document for church info
        const contactMessages = await ContactMessage.find().sort({ date: -1 }); // Sort by newest first

        if (!churchInfo) {
            return res.status(404).json({ message: 'Church info not found.' });
        }

        res.status(200).json({
            churchInfo: churchInfo,
            contactMessages: contactMessages
        });

    } catch (err) {
        console.error('Error fetching admin data:', err);
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});


router.post('/email', async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const newMessage = new ContactMessage({
            firstName,
            lastName,
            email,
            message
        });

        await newMessage.save();

        res.status(200).json({ message: 'Message Delivered', data: newMessage });
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ message: 'Failed to send message.', error: err.message });
    }
});

// POST request to update church info (e.g., from an admin form)
router.post('/admin/info', async (req, res) => {
    try {
        const updatedInfo = await ChurchInfo.findOneAndUpdate(
            {}, // Find the single document
            req.body,
            { new: true, upsert: true, runValidators: true } // Return the updated document, create if it doesn't exist
        );
        res.status(200).json({ message: 'Church info updated successfully', data: updatedInfo });
    } catch (err) {
        res.status(400).json({ message: 'Failed to update church info.', error: err.message });
    }
});

router.get('/admin/info', async (req, res) => {
    try {
        const churchInfo = await ChurchInfo.findOne(); // Assumes only one document for church info
        if (!churchInfo) {
            return res.status(404).json({ message: 'Church info not found.' });
        }
        res.json(churchInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
    
router.put('/admin/message/:id', async (req, res) => {
    try {
        const updatedMessage = await ContactMessage.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json({ message: 'Contact message updated successfully', data: updatedMessage });
    } catch (err) {
        res.status(400).json({ message: 'Failed to update contact message.', error: err.message });
    }
});


router.put('/admin/info', async (req, res) => {
    try {
        const updatedInfo = await ChurchInfo.findOneAndUpdate(
            {}, // Find the single document
            req.body,
            { new: true, upsert: true, runValidators: true } // Return the updated document, create if it doesn't exist
        );
        res.status(200).json({ message: 'Church info updated successfully', data: updatedInfo });
    } catch (err) {
        res.status(400).json({ message: 'Failed to update church info.', error: err.message });
    }
});

router.delete('/admin/info', async (req, res) => {
    try {
        const deletedInfo = await ChurchInfo.findOneAndDelete({});
        if (!deletedInfo) {
            return res.status(404).json({ message: 'Church info not found.' });
        }
        res.json({ message: 'Church info deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE request to delete a specific contact message by ID
router.delete('/admin/message/:id', async (req, res) => {
    try {
        const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Contact message not found.' });
        }
        res.json({ message: 'Contact message deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
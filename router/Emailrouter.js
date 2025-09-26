const express = require("express");
const router = express.Router();

const emailControllers = require('../controler/Emailcontrole');

// POST route to submit a new email
// Endpoint: /api/email
router.post("/email", emailControllers.createEmail);

// GET route to get all emails
// Endpoint: /api/emails
router.get("/emails", emailControllers.getAllEmails);

// GET route to get a single email by ID
// Endpoint: /api/emails/:id
router.get("/emails/:id", emailControllers.getSingleEmail);

router.delete('/emails/:id', emailControllers.deleteEmail);

module.exports = router;

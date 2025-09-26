const Email = require('../modules/Email'); 

// POST: Create a new email
exports.createEmail = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;
    const newEmail = new Email({
      firstName,
      lastName,
      email,
      message,
    });
    const savedEmail = await newEmail.save();
    res.status(201).json({
      success: true,
      data: savedEmail,
      message: "Email submitted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "server-side error",
      details: error.message,
    });
  }
};

// GET: Get all emails
exports.getAllEmails = async (req, res) => {
  try {
    const emails = await Email.find();
    res.status(200).json({
      success: true,
      data: emails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "server-side error",
    });
  }
};

// GET: Get a single email by ID
exports.getSingleEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const email = await Email.findById(id);
    if (!email) {
      return res.status(404).json({
        success: false,
        error: "Email not found",
      });
    }
    res.status(200).json({
      success: true,
      data: email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "server-side error",
    });
  }
};

exports.deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmail = await Email.findByIdAndDelete(id);
    if (!deletedEmail) {
      return res.status(404).json({
        success: false,
        error: "Email not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Email deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "server-side error",
    });
  }
};
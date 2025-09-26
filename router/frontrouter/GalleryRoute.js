// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const Gallery = require('../../modules/frontmodule/Gallerypage');

// GET all gallery photos
router.get('/gallery', async (req, res) => {
  try {
    const galleryData = await Gallery.findOne(); // Assumes there is only one gallery document
    if (!galleryData) {
      return res.status(404).json({ message: 'No gallery data found.' });
    }
    res.json(galleryData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new gallery document
// This is for demonstration. In a real application, you would add an admin check.
router.post('/admin/gall', async (req, res) => {
  try {
    // ஏற்கனவே உள்ள Gallery ஆவணத்தைக் கண்டறியவும்
    const gallery = await Gallery.findOne();

    // ஆவணம் இல்லையென்றால், ஒரு புதிய ஆவணத்தை உருவாக்கவும் (முதல் புகைப்படம் சேர்க்கப்படும்போது)
    if (!gallery) {
      const newGallery = new Gallery({ photos: [req.body] });
      const savedGallery = await newGallery.save();
      return res.status(201).json(savedGallery);
    }

    // ஆவணம் ஏற்கனவே இருந்தால், புதிய புகைப்படத்தை photos array-ல் சேர்க்கவும்
    gallery.photos.push(req.body);
    const savedGallery = await gallery.save();
    res.status(201).json(savedGallery);

  } catch (err) {
    // பிழை ஏற்பட்டால், பிழைச் செய்தியைக் காண்பிக்கவும்
    res.status(400).json({ message: err.message });
  }
});

router.put('/gall/:id', async (req, res) => {
  try {
    // முதல் `Gallery` ஆவணத்தைக் கண்டறியவும் (அப்ளிகேஷனில் ஒரே ஒரு ஆவணம் உள்ளதால்)
    const gallery = await Gallery.findOne();
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery document not found.' });
    }

    // புதுப்பிக்கப்பட வேண்டிய புகைப்படத்தைக் கண்டறியவும்
    const photoId = req.params.id;
    const photoToUpdate = gallery.photos.id(photoId);

    if (!photoToUpdate) {
      return res.status(404).json({ message: 'Photo not found within gallery.' });
    }

    // புகைப்படத்தை புதுப்பிக்கவும்
    photoToUpdate.set(req.body);
    await gallery.save();
    res.json(photoToUpdate);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/gall/:id', async (req, res) => {
  try {
    // முதல் `Gallery` ஆவணத்தைக் கண்டறியவும் (அப்ளிகேஷனில் ஒரே ஒரு ஆவணம் உள்ளதால்)
    const gallery = await Gallery.findOne();
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery document not found.' });
    }

    // Mongoose `$pull` operator-ஐப் பயன்படுத்தி புகைப்படத்தை நீக்கவும்
    gallery.photos.pull({ _id: req.params.id });
    await gallery.save();

    res.json({ message: 'Photo deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
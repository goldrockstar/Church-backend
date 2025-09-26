// models/Gallery.js
const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    title : { type: String},
  photos: [
    {
      url: {
        type: String,
        required: true
      },
      alt: {
        type: String,
        required: false,
        default: ''
      }
    }
  ]
});

module.exports = mongoose.model('Gallery', GallerySchema);
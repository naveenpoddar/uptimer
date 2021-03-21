const mongoose = require('mongoose');

const UrlsConfig = new mongoose.Schema({
  authorID: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  projectURL: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  pinged: {
    type: mongoose.SchemaTypes.Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UrlsConfig', UrlsConfig);

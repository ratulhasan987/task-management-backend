const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  name: String,
  path: String,
  extension: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attachment', attachmentSchema);

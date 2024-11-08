
const express = require('express');
const multer = require('multer');
const Attachment = require('../models/Attachment');
const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// POST route to upload files
router.post('/upload', upload.array('files'), async (req, res) => {
  const fileDetails = req.files.map(file => ({
    name: file.originalname,
    path: file.path,
    extension: file.mimetype.split('/')[1],
  }));

  try {
    await Attachment.insertMany(fileDetails);
    res.status(200).json({ message: 'Files uploaded and stored' });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading files', error: err });
  }
});

// GET route to retrieve all uploaded files
router.get('/files', async (req, res) => {
  try {
    const files = await Attachment.find({});
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving files', error: err });
  }
});

module.exports = router;

const express = require('express');
const multer = require('../../middlewares/multer');
const uploadController = require('../../controllers/UploadController');
const router = express.Router();

router.post('/upload',
  multer().single('images-files'),
  uploadController.uploadImage);

module.exports = router;

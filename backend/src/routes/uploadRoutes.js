const express = require('express');
const { uploadResume, getResumes } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/resume', protect, uploadResume);
router.get('/resumes', protect, getResumes);

module.exports = router;
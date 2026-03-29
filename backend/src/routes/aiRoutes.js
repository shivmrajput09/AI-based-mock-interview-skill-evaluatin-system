const express = require('express');
const { generateQuestions } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/interview/:resumeId', protect, generateQuestions);

module.exports = router;

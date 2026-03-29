const express = require('express');
const { getJobs, getJob, createJob } = require('../controllers/jobController');
const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', createJob); // For creating jobs, perhaps protect later

module.exports = router;
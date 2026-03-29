const multer = require('multer');
const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files allowed'));
  }
});

exports.uploadResume = [
  upload.single('resume'),
  async (req, res) => {
    try {
      const data = await pdfParse(req.file.buffer);
      const resume = await Resume.create({
        user: req.user.id,
        filename: Date.now() + '-' + req.file.originalname, // Generate unique filename
        originalName: req.file.originalname,
        content: data.text
      });
      // Generate questions immediately
      const { detectSkills, buildQuestions, categorizeQuestions } = require('../utils/questions');
      const skills = detectSkills(data.text);
      const allQuestions = buildQuestions(skills);
      const questions = categorizeQuestions(allQuestions);
      const totalQuestions = allQuestions.length;
      
      res.json({ 
        message: 'Resume uploaded & questions generated!', 
        resume, 
        questions, 
        skills, 
        totalQuestions 
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

exports.getResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user.id });
  res.json(resumes);
};
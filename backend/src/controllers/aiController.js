const Resume = require('../models/Resume');
const { detectSkills, buildQuestions, categorizeQuestions } = require('../utils/questions');

exports.generateQuestions = async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findOne({ _id: resumeId, user: req.user.id });

  if (!resume) return res.status(404).json({ message: 'Resume not found.' });

  const skills = detectSkills(resume.content || '');
  const allQuestions = buildQuestions(skills);
  const categorizedQuestions = categorizeQuestions(allQuestions);

  res.json({
    questions: categorizedQuestions,
    skills,
    totalQuestions: allQuestions.length,
    generatedAt: new Date().toISOString()
  });
};


const technicalQuestions = {
  JavaScript: [
    'How do you handle asynchronous operations in JavaScript?',
    'Explain the difference between var, let, and const in JavaScript.',
    'How do you optimize JavaScript code for better performance?',
    'Describe your experience with JavaScript frameworks and libraries.'
  ],
  React: [
    'How do you manage state in a React application?',
    'Explain the component lifecycle in React.',
    'How do you handle side effects in React?',
    'Describe your approach to testing React components.'
  ],
  Node: [
    'How do you handle errors in Node.js applications?',
    'Explain your experience with Node.js middleware.',
    'How do you scale Node.js applications?',
    'Describe your approach to API design in Node.js.'
  ],
  MongoDB: [
    'How do you design MongoDB schemas for your applications?',
    'Explain your experience with MongoDB aggregation pipelines.',
    'How do you handle database indexing in MongoDB?',
    'Describe your approach to data modeling in MongoDB.'
  ],
  Python: [
    'How do you handle exceptions in Python?',
    'Explain your experience with Python frameworks.',
    'How do you optimize Python code performance?',
    'Describe your approach to testing Python applications.'
  ]
};

const behavioralQuestions = [
  'Describe a challenging project you worked on and how you overcame obstacles.',
  'How do you handle tight deadlines and competing priorities?',
  'Tell me about a time when you received constructive feedback and how you applied it.',
  'How do you approach learning new technologies or frameworks?',
  'Describe a situation where you had to collaborate with a difficult team member.'
];

const situationalQuestions = [
  'How would you approach debugging a production issue with minimal downtime?',
  'If you were given a legacy codebase to maintain, what would be your first steps?',
  'How would you handle a disagreement with a colleague about technical decisions?',
"If a project deadline is approaching and you realize the current approach won't work, what do you do?",


  'How would you explain a complex technical concept to a non-technical stakeholder?'
];

const detectSkills = (text) => {
  const skills = [];
  const skillMap = {
    'javascript': 'JavaScript',
    'js': 'JavaScript',
    'react': 'React',
    'node': 'Node',
    'nodejs': 'Node',
    'express': 'Node',
    'mongodb': 'MongoDB',
    'mongo': 'MongoDB',
    'python': 'Python',
    'py': 'Python',
    'typescript': 'JavaScript',
    'ts': 'JavaScript',
    'aws': 'AWS',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'k8s': 'Kubernetes',
    'sql': 'SQL',
    'mysql': 'SQL',
    'postgresql': 'SQL'
  };

  const lower = text.toLowerCase();
  Object.keys(skillMap).forEach((key) => {
    if (lower.includes(key)) skills.push(skillMap[key]);
  });

  return [...new Set(skills)];
};

const getRandomQuestions = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const buildQuestions = (skills) => {
  const questions = [];

  // Add skill-specific technical questions
  skills.forEach(skill => {
    if (technicalQuestions[skill]) {
      const skillQuestions = getRandomQuestions(technicalQuestions[skill], 2);
      questions.push(...skillQuestions);
    }
  });

  // Add general technical questions if no specific skills found
  if (questions.length === 0) {
    questions.push(
      'Can you walk me through your most recent project and the key technologies you used?',
      'What are your strongest programming languages, and why do you prefer them?'
    );
  }

  // Add behavioral questions (always include 2)
  const behavioral = getRandomQuestions(behavioralQuestions, 2);
  questions.push(...behavioral);

  // Add situational questions (1-2 random)
  const situational = getRandomQuestions(situationalQuestions, Math.floor(Math.random() * 2) + 1);
  questions.push(...situational);

  // Add experience-based questions
  if (skills.length > 0) {
    questions.push(`Based on your experience with ${skills.slice(0, 2).join(' and ')}, how would you approach architecting a new application?`);
  }

  // Shuffle final questions to avoid predictable order
  return questions.sort(() => 0.5 - Math.random()).slice(0, 8); // Return max 8 questions
};

const categorizeQuestions = (questions) => {
  const categorized = {
    technical: [],
    behavioral: [],
    situational: []
  };

  // Simple categorization based on keywords (you can improve this)
  questions.forEach(q => {
    const lower = q.toLowerCase();
    if (lower.includes('how do you') || lower.includes('explain') || lower.includes('describe your') || lower.includes('experience')) {
      categorized.technical.push(q);
    } else if (lower.includes('time when') || lower.includes('challenging') || lower.includes('collaborate')) {
      categorized.behavioral.push(q);
    } else {
      categorized.situational.push(q);
    }
  });

  return categorized;
};

module.exports = {
  technicalQuestions,
  behavioralQuestions,
  situationalQuestions,
  detectSkills,
  getRandomQuestions,
  buildQuestions,
  categorizeQuestions
};


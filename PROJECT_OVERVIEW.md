# AI Interview Agent - Project Overview

## 🎯 Problem Statement
Job seekers struggle with manual interview preparation. They need personalized, skill-based questions from their resume without 2-step workflows or generic question banks.

## 📋 Objectives
1. **One-click AI Interview Prep** – Upload PDF resume → instant categorized questions.
2. **Skill Detection** – Parse resume → detect JS/React/Node/Python/etc.
3. **Categorized Questions** – Technical (40%), Behavioral (30%), Situational (30%).
4. **Full-stack Production App** – Auth, MongoDB, robust error handling.

## 🛠️ Methodology & Tech Stack
**Frontend (React 19 + Vite + Tailwind):**
- Drag-drop PDF upload
- AuthContext, services/api.js proxy
- Responsive UI with question badges

**Backend (Node/Express + MongoDB):**
- Multer + pdf-parse → text extraction
- utils/questions.js → skill detection + 8 questions/resume
- Controllers: upload (inline gen), ai (legacy)

**Key Algorithms:**
```
detectSkills(text) → skillMap regex match
buildQuestions(skills) → random shuffle + category balance
categorizeQuestions(allQ) → keyword-based bucketing
```

## 🔧 Implementation Details
```
1. Upload: PDF → parse → save Resume.content → detectSkills → buildQuestions → return {resume, questions}
2. Frontend: handleUpload → auto setQuestions/skills → show categorized UI
3. Backend fixes: Port fallback, CORS proxy, utils refactor
Files: 50+ (models: User/Job/Resume, controllers, routes, services)
```

## ⚠️ Challenges Faced & Solutions
| Challenge | Solution |
|-----------|----------|
| Port 5002 EADDRINUSE crash | `taskkill /f node.exe` + server.js try-catch fallback |
| Network/CORS errors | Vite proxy `/api` → 5002 + CORS origins array |
| 2-step upload | Inline generation in uploadController.js |
| JS string escape `'won\\'t` | Fixed to `"won't"` double quotes |
| Edit precision | Multiple small `edit_file` + `create_file` fallback |

## ✅ Results
- **100% Success:** Upload PDF → instant 8 questions with skills badges
- **Stable:** Backend 5002 + MongoDB, Frontend 5173 proxy
- **Tested:** Auth → upload → questions flow seamless
- **Scalable:** utils.js shared logic

## 🔮 Future Scope
1. **Google Gemini API** – Real AI generation vs rule-based
2. **Mock Interview** – Voice recording + AI feedback
3. **Job Matching** – Questions by job title/company
4. **Multi-language** – Resume parsing + questions in Hindi/others
5. **Mobile App** – React Native + push notifications

## 📊 Identified Gaps
| Gap | Priority |
|-----|----------|
| Rule-based vs true AI | High (Gemini integration) |
| Basic categorization | Medium (NLP keywords) |
| No question difficulty | Low (easy/medium/hard tags) |
| No analytics | Low (question views per user)

**Live:** localhost:5173 – Ready for demo/portfolio!

import { api } from './api';

export const generateInterviewQuestions = (resumeId) => api.get(`/ai/interview/${resumeId}`);

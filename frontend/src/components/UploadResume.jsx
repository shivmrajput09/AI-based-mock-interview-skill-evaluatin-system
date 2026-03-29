import { useState } from 'react';
import { uploadResume } from '../services/uploadService';


export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [questions, setQuestions] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [skills, setSkills] = useState([]);
  // const [generating, setGenerating] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setError('');
    setSuccess('');
    setUploading(true);
    try {
      const res = await uploadResume(file);
      const id = res.data.resume?._id;
      setResumeId(id || null);
      setQuestions(res.data.questions || {});
      setSkills(res.data.skills || []);
      setTotalQuestions(res.data.totalQuestions || 0);
      setSuccess(`Resume uploaded & ${res.data.totalQuestions || 0} AI questions generated!`);
      setFile(null);
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err?.message || 'Upload failed. Please try again.';
      setError(errorMsg);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };




  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Your Resume</h2>
        <p className="text-slate-600">Upload a PDF resume to get AI-generated interview questions</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm font-medium">{success}</p>
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-slate-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-4xl mb-4">📄</div>
        <p className="text-slate-600 mb-4">
          {file ? `Selected: ${file.name}` : 'Drag & drop your PDF resume here, or click to browse'}
        </p>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className="inline-block bg-slate-100 text-slate-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors"
        >
          Choose File
        </label>
      </div>

      {file && (
        <div className="mt-6 grid gap-3">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload Resume'}
          </button>

        </div>
      )}

      {totalQuestions > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your AI Interview Questions ({totalQuestions})</h3>

          {questions.technical && questions.technical.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-blue-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Technical Questions
              </h4>
              <div className="space-y-2">
                {questions.technical.map((q, idx) => (
                  <div key={`tech-${idx}`} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="font-bold mr-2 text-blue-700">{idx + 1}.</span>{q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {questions.behavioral && questions.behavioral.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-green-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Behavioral Questions
              </h4>
              <div className="space-y-2">
                {questions.behavioral.map((q, idx) => (
                  <div key={`beh-${idx}`} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <span className="font-bold mr-2 text-green-700">{idx + 1}.</span>{q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {questions.situational && questions.situational.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-purple-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Situational Questions
              </h4>
              <div className="space-y-2">
                {questions.situational.map((q, idx) => (
                  <div key={`sit-${idx}`} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <span className="font-bold mr-2 text-purple-700">{idx + 1}.</span>{q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-slate-700 font-medium mb-2">🎯 Detected Skills:</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
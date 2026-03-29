export default function Home() {
  return (
    <section className="text-center py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AIMock
        </h1>
        <p className="text-lg text-slate-600 mb-4 font-semibold">
          AI Mock Interview & Skill Evaluation System with Job Portal
        </p>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Prepare for your dream job with AI-powered mock interviews. Get personalized questions, evaluate your skills, explore job opportunities, and practice with confidence.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
            <p className="text-slate-600">Parse your resume and extract key skills automatically</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold mb-2">AI Questions</h3>
            <p className="text-slate-600">Get tailored interview questions based on your profile</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-slate-600">Monitor your performance and improve over time</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-slate-200">
          <h2 className="text-2xl font-bold mb-4">Get Started</h2>
          <p className="text-slate-600 mb-6">Sign up or log in to begin your AI interview preparation journey.</p>
          <div className="flex gap-4 justify-center">
            <a href="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Sign Up Free
            </a>
            <a href="/login" className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
              Log In
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

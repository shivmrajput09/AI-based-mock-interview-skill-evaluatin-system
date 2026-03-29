import { useAuth } from '../context/AuthContext';
import UploadResume from '../components/UploadResume';

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) return <p>Please login first.</p>;

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-indigo-100">Ready to ace your next interview?</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">Resume Status</h3>
            <p className="text-slate-600">Upload your resume to get personalized questions</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Practice Sessions</h3>
            <p className="text-slate-600">Start mock interviews based on your profile</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-slate-600">Monitor your improvement over time</p>
          </div>
        </div>

        <UploadResume />

        <div className="mt-8 text-center">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}

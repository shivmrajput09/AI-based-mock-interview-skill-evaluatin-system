import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (location) params.location = location;
      if (type) params.type = type;

      const response = await api.get('/jobs', { params });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Job Search</h1>

        <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2"
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
        </form>

        {loading ? (
          <p className="text-center">Loading jobs...</p>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-indigo-600 font-medium mb-2">{job.company}</p>
                <p className="text-slate-600 mb-2">{job.location}</p>
                <p className="text-slate-700 mb-4">{job.description}</p>
                {job.requirements && <p className="text-slate-600 mb-2"><strong>Requirements:</strong> {job.requirements}</p>}
                {job.salary && <p className="text-slate-600 mb-2"><strong>Salary:</strong> {job.salary}</p>}
                <p className="text-slate-500 text-sm">Type: {job.type}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
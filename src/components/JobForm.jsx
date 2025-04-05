import React, { useState } from "react";
import { useJobs } from "../context/JobContext";

const JobForm = () => {
  const { createJob, loading } = useJobs();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: name === "salary" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createJob(jobData);
    if (result) {
      setSuccess(true);
      setJobData({
        title: "",
        description: "",
        location: "",
        salary: "",
      });
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="px-1 py-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Post a New Job</h3>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Job posted successfully! You can view it in "My Posted Jobs".
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            placeholder="e.g. Software Engineer"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            placeholder="Describe the job responsibilities and requirements"
            rows="5"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            placeholder="e.g. New York, NY or Remote"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Annual Salary ($)</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            placeholder="e.g. 80000"
            min="1"
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;

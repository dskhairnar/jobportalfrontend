import React from "react";
import { useJobs } from "../context/JobContext";

const JobList = ({
  jobs,
  isJobSeeker = false,
  isRecruiter = false,
  title = "Available Jobs",
}) => {
  const { applyToJob, loading } = useJobs();

  const handleApply = async (jobId) => {
    await applyToJob(jobId);
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginTop: "1rem",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s ease-in-out",
    overflow: "hidden",
  };

  const cardHeaderStyle = {
    padding: "1rem",
    borderBottom: "1px solid #f3f4f6",
  };

  const cardContentStyle = {
    padding: "1rem",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: "#111827",
  };

  const salaryStyle = {
    backgroundColor: "#dcfce7",
    color: "#166534",
    fontWeight: 500,
    fontSize: "0.875rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "20px",
    marginLeft: "auto",
  };

  const locationStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "0.875rem",
    color: "#6b7280",
    marginTop: "0.25rem",
  };

  const iconStyle = {
    height: "16px",
    width: "16px",
    marginRight: "0.25rem",
  };

  const descriptionStyle = {
    color: "#374151",
    marginBottom: "1rem",
    fontSize: "0.9rem",
    lineHeight: "1.4",
  };

  const infoStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "0.5rem",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: loading ? "not-allowed" : "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: loading ? 0.7 : 1,
  };

  const emptyStateStyle = {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div style={emptyStateStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <div style={{ marginTop: "1rem" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: "64px", width: "64px", color: "#d1d5db", marginBottom: "1rem" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p style={{ color: "#6b7280" }}>
            No jobs found.{" "}
            {isRecruiter ? "Post your first job!" : "Check back later for new opportunities."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 style={titleStyle}>{title}</h3>
      <div style={containerStyle}>
        {jobs.map((job) => (
          <div key={job._id} style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={titleStyle}>{job.title}</h4>
                <span style={salaryStyle}>${job.salary.toLocaleString()}/year</span>
              </div>
              <div style={locationStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </div>
            </div>

            <div style={cardContentStyle}>
              <p style={descriptionStyle}>{job.description}</p>

              {job.postedBy?.name && (
                <div style={infoStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Posted by: {job.postedBy.name}
                </div>
              )}

              <div style={infoStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" style={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Posted: {new Date(job.createdAt).toLocaleDateString()}
              </div>

              {isJobSeeker && (
                <button
                  style={buttonStyle}
                  onClick={() => handleApply(job._id)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        style={{ marginRight: "0.5rem", height: "16px", width: "16px" }}
                        className="animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Applying...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ height: "16px", width: "16px", marginRight: "0.5rem" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Apply Now
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;

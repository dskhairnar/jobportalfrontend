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
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "30px",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "20px",
          color: "#1f2937",
          textAlign: "center",
        }}
      >
        Post a New Job
      </h3>

      {success && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#ecfdf5",
            border: "1px solid #d1fae5",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            style={{ width: "20px", height: "20px", color: "#10b981", marginRight: "10px" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p style={{ fontSize: "14px", color: "#065f46", margin: 0 }}>
            Job posted successfully! You can view it in "My Posted Jobs".
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {["title", "location", "salary"].map((field) => (
          <div key={field} style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor={field}
              style={{ marginBottom: "5px", fontWeight: "500", color: "#374151" }}
            >
              {field === "salary"
                ? "Annual Salary ($)"
                : field === "title"
                ? "Job Title"
                : "Location"}
            </label>
            <input
              type={field === "salary" ? "number" : "text"}
              id={field}
              name={field}
              value={jobData[field]}
              onChange={handleChange}
              required
              placeholder={
                field === "salary"
                  ? "e.g. 80000"
                  : field === "title"
                  ? "e.g. Software Engineer"
                  : "e.g. New York, NY or Remote"
              }
              min={field === "salary" ? 1 : undefined}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                outlineColor: "#2563eb",
              }}
            />
          </div>
        ))}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="description" style={{ marginBottom: "5px", fontWeight: "500", color: "#374151" }}>
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            rows="5"
            required
            placeholder="Describe the job responsibilities and requirements"
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              resize: "vertical",
              outlineColor: "#2563eb",
            }}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#9ca3af" : "#2563eb",
            color: "#fff",
            padding: "12px",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            border: "none",
            transition: "background-color 0.3s",
          }}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;

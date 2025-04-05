import { createContext, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create an axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch jobs");
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs posted by current user (recruiter/manager)
  const fetchMyJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs/myjobs");
      setMyJobs(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch your jobs");
      toast.error("Failed to fetch your jobs");
    } finally {
      setLoading(false);
    }
  };

  // Create a new job (recruiter/manager)
  const createJob = async (jobData) => {
    setLoading(true);
    try {
      const res = await api.post("/jobs", jobData);
      setMyJobs([...myJobs, res.data]);
      toast.success("Job created successfully!");
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job");
      toast.error("Failed to create job");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Apply to a job (job seeker)
  const applyToJob = async (jobId) => {
    setLoading(true);
    try {
      await api.post("/applications/apply", { jobId });
      toast.success("Application submitted successfully!");
      return true;
    } catch (err) {
      const errorMsg =
        err.response?.data?.msg || "Failed to submit application";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch my applications (job seeker)
  const fetchMyApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get("/applications/my-applications");
      setMyApplications(res.data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch your applications"
      );
      toast.error("Failed to fetch your applications");
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        myJobs,
        myApplications,
        loading,
        error,
        fetchJobs,
        fetchMyJobs,
        createJob,
        applyToJob,
        fetchMyApplications,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;

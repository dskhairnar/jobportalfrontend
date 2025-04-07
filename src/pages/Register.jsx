import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  const { register, loading } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ebf8ff, #d6bcfa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
          borderRadius: "1rem",
          width: "100%",
          maxWidth: "32rem",
          padding: "2.5rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#2d3748",
            }}
          >
            Sign Up
          </h2>
          <p style={{ color: "#718096", marginTop: "0.5rem" }}>
            Start your journey with us today!
          </p>
        </div>

        <form onSubmit={handleRegister} style={{ marginTop: "2rem" }}>
          {/* Full Name */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                fontSize: "0.875rem",
                color: "#4a5568",
                fontWeight: "500",
              }}
            >
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              required
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                marginTop: "0.25rem",
                border: "1px solid #cbd5e0",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                outline: "none",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                fontSize: "0.875rem",
                color: "#4a5568",
                fontWeight: "500",
              }}
            >
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                marginTop: "0.25rem",
                border: "1px solid #cbd5e0",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                fontSize: "0.875rem",
                color: "#4a5568",
                fontWeight: "500",
              }}
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                marginTop: "0.25rem",
                border: "1px solid #cbd5e0",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                outline: "none",
              }}
            />
          </div>

          {/* Role */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                fontSize: "0.875rem",
                color: "#4a5568",
                fontWeight: "500",
              }}
            >
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                marginTop: "0.25rem",
                border: "1px solid #cbd5e0",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                outline: "none",
              }}
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
              <option value="manager">Hiring Manager</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#3182ce",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "background-color 0.2s",
              border: "none",
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#718096",
            marginTop: "1.5rem",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#3182ce",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login, loading } = useAuth();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #f0fdf4, #d1fae5)",
        padding: "3rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "white",
          borderRadius: "1rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.875rem", fontWeight: "800", color: "#111827", marginBottom: "0.5rem" }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#4B5563" }}>Sign in to access your account</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0.75rem",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: "1.25rem", width: "1.25rem", color: "#9CA3AF" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                onChange={handleChange}
                style={{
                  width: "80%",
                  padding: "0.5rem 0.75rem 0.5rem 2.25rem",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0.75rem",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: "1.25rem", width: "1.25rem", color: "#9CA3AF" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                onChange={handleChange}
                style={{
                  width: "80%",
                  padding: "0.5rem 0.75rem 0.5rem 2.25rem",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                backgroundColor: loading ? "#4ade80" : "#10b981",
                color: "white",
                fontWeight: "500",
                fontSize: "0.875rem",
                border: "none",
                borderRadius: "0.375rem",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <svg
                    style={{ animation: "spin 1s linear infinite", height: "1rem", width: "1rem" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z"
                      style={{ opacity: 0.75 }}
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        {/* Register link */}
        <div style={{ textAlign: "center", fontSize: "0.875rem", marginTop: "1.5rem" }}>
          <p style={{ color: "#4B5563" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#10b981", fontWeight: "500", textDecoration: "none" }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

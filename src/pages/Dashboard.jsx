import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobContext";

// Components
import JobList from "../components/JobList";
import JobForm from "../components/JobForm";
import ApplicationList from "../components/ApplicationList";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const {
    jobs,
    myJobs,
    myApplications,
    loading,
    fetchJobs,
    fetchMyJobs,
    fetchMyApplications,
  } = useJobs();

  const [activeTab, setActiveTab] = useState("jobs");

  useEffect(() => {
    fetchJobs();
    if (user?.role === "jobseeker") fetchMyApplications();
    if (user?.role === "recruiter" || user?.role === "manager") fetchMyJobs();
  }, [user]);

  if (!user) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <div style={{ padding: 16, textAlign: "center" }}>
          <div style={{
            width: 64,
            height: 64,
            border: "4px solid #e5e7eb",
            borderTopColor: "#3b82f6",
            borderRadius: "50%",
            margin: "0 auto 1rem",
            animation: "spin 1s linear infinite"
          }}></div>
          <p style={{ color: "#4b5563", fontWeight: 500 }}>Loading...</p>
        </div>
      </div>
    );
  }

  const renderTabs = () => {
    const tabs = [{ key: "jobs", label: "Available Jobs", icon: "briefcase" }];
    if (user.role === "recruiter" || user.role === "manager") {
      tabs.push(
        { key: "myjobs", label: "My Posted Jobs", icon: "clipboard-list" },
        { key: "create", label: "Post New Job", icon: "plus-circle" }
      );
    }
    if (user.role === "jobseeker") {
      tabs.push({ key: "applications", label: "My Applications", icon: "document-text" });
    }

    return tabs.map((tab) => {
      let iconPath;
      switch (tab.icon) {
        case 'briefcase':
          iconPath = "M6 7V6a3 3 0 013-3h6a3 3 0 013 3v1h1a2 2 0 012 2v8a2 2 0 01-2 2h-1v1a3 3 0 01-3 3H9a3 3 0 01-3-3v-1H5a2 2 0 01-2-2V9a2 2 0 012-2h1z";
          break;
        case 'clipboard-list':
          iconPath = "M9 5H7a2 2 0 00-2 2v12h10V7a2 2 0 00-2-2h-2V3h-2v2z";
          break;
        case 'plus-circle':
          iconPath = "M12 4v16m8-8H4";
          break;
        case 'document-text':
          iconPath = "M9 12h6m-6 4h6M7 4h10l1 1v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6l1-1z";
          break;
      }

      return (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "6px 12px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            border: activeTab === tab.key ? "1px solid #93c5fd" : "1px solid #d1d5db",
            backgroundColor: activeTab === tab.key ? "#dbeafe" : "#ffffff",
            color: activeTab === tab.key ? "#1d4ed8" : "#374151",
            transition: "background-color 0.2s"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 14, height: 14, marginRight: 6 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
          {tab.label}
        </button>
      );
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem 0" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 48,
              height: 48,
              border: "4px solid #e5e7eb",
              borderTopColor: "#3b82f6",
              borderRadius: "50%",
              margin: "0 auto 1rem",
              animation: "spin 1s linear infinite"
            }}></div>
            <p style={{ color: "#4b5563", fontWeight: 500 }}>Loading...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "jobs":
        return <JobList jobs={jobs} isJobSeeker={user.role === "jobseeker"} title="Available Jobs" />;
      case "myjobs":
        return <JobList jobs={myJobs} isRecruiter title="Jobs Posted by You" />;
      case "create":
        return <JobForm />;
      case "applications":
        return <ApplicationList applications={myApplications} />;
      default:
        return <p style={{ color: "#4b5563", fontStyle: "italic" }}>Select a tab to view content.</p>;
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        position: "fixed",
        width: "90%",
        zIndex: 10,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 24, height: 24, color: "#2563eb" }} viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
          </svg>
          <span style={{ marginLeft: 8, fontSize: 20, fontWeight: "bold", color: "#111827" }}>JobBoard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
          </div>
          <div style={{
            height: 32,
            width: 32,
            borderRadius: "50%",
            backgroundColor: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1d4ed8",
            fontWeight: 600,
            fontSize: 14
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px 12px",
              fontSize: 14,
              fontWeight: 500,
              border: "1px solid #d1d5db",
              borderRadius: 6,
              backgroundColor: "#ffffff",
              color: "#374151",
              cursor: "pointer"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 14, height: 14, marginRight: 6 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ paddingTop: 64, paddingBottom: 48 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: 24 }}>
          <div style={{ backgroundColor: "#ffffff", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", borderRadius: 8, padding: 24, marginBottom: 24 }}>
            <h1 style={{ fontSize: 20, fontWeight: "bold", color: "#111827" }}>Welcome to your Dashboard</h1>
            <p style={{ marginTop: 4, color: "#6b7280" }}>Manage your job applications and postings all in one place</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {renderTabs()}
          </div>

          <div style={{ backgroundColor: "#ffffff", padding: 24, borderRadius: 8, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

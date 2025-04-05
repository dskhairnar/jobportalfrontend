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

    if (user?.role === "jobseeker") {
      fetchMyApplications();
    }

    if (user?.role === "recruiter" || user?.role === "manager") {
      fetchMyJobs();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-4 text-center">
          <div className="w-16 h-16 border-4 border-t-primary-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const renderTabs = () => {
    const tabs = [
      { key: "jobs", label: "Available Jobs", icon: "briefcase" },
    ];

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
      
      // SVG paths for different icons
      switch(tab.icon) {
        case 'briefcase':
          iconPath = "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
          break;
        case 'clipboard-list':
          iconPath = "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01";
          break;
        case 'plus-circle':
          iconPath = "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z";
          break;
        case 'document-text':
          iconPath = "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z";
          break;
      }
      
      return (
        <button
          key={tab.key}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === tab.key 
            ? "bg-primary-100 text-primary-800 border-primary-200 border" 
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
          onClick={() => setActiveTab(tab.key)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
          {tab.label}
        </button>
      );
    });

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="p-4 text-center">
            <div className="w-12 h-12 border-4 border-t-primary-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "jobs":
        return (
          <JobList
            jobs={jobs}
            isJobSeeker={user.role === "jobseeker"}
            title="Available Jobs"
          />
        );

      case "myjobs":
        return <JobList jobs={myJobs} isRecruiter title="Jobs Posted by You" />;

      case "create":
        return <JobForm />;

      case "applications":
        return <ApplicationList applications={myApplications} />;

      default:
        return (
          <p className="text-gray-600 italic">Select a tab to view content.</p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-900">JobBoard</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                </div>
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-800 font-medium text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Welcome Banner */}
          <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to your Dashboard</h1>
            <p className="mt-1 text-gray-600">Manage your job applications and postings all in one place</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">{renderTabs()}</div>

          {/* Main Content */}
          <div className="bg-white shadow-sm rounded-lg p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

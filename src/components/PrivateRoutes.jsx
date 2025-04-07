import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading, authInitialized, refreshUserData } = useAuth();
  const token = localStorage.getItem("token");

  // Effect to refresh user data when component mounts if token exists
  useEffect(() => {
    if (token && !user && authInitialized) {
      refreshUserData();
    }
  }, [token, user, authInitialized, refreshUserData]);

  // Show loading state while authentication is being checked
  if (loading || !authInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-4 text-center">
          <div className="w-16 h-16 border-4 border-t-primary-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if no token or user
  return token && user ? children : <Navigate to="/" />;
};

export default PrivateRoute;

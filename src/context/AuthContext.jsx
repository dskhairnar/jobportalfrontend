import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Create an axios instance with default config
const api = axios.create({
  baseURL: "https://jobportalbackend-2-3oyp.onrender.com/api",
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  const checkLoggedIn = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Get user data
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
    setAuthInitialized(true);
  }, []);

  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  // Login function
  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success("Login successful!");
      navigate("/dashboard");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
      return false;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await api.post("/auth/register", userData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success("Registration successful!");
      navigate("/dashboard");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Logged out successfully");
    navigate("/");
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data);
      return true;
    } catch (err) {
      console.error("Failed to refresh user data:", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUserData,
        authInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import useStorage from "../hooks/useStorage";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser, unlocked, setUnlocked } = useStorage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = async () => {
    setLoading(true);
    try {
    
        const response = await api.get("/user/profile");
        const { data } = response;

        if (!data.success) {
          setUser(null);
          setUnlocked(false);
          if (data.message) setError(data.message);
          return;
        }

        if (data.data && data.data.user) {
          setUser(data.data.user);
        }
    
    } catch (err) {
      setUser(null);
      setUnlocked(false);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post("/user/authenticate", {
        email,
        password,
      });
      const userData = response.data.user || response.data.data?.user || null;
      
      setUser(userData);
      setUnlocked(false);
      setError(null);

      // Return response with redirect logic
      const result = { ...response.data };
      
      // If email is not verified, add redirect to message page
      if (userData && !userData.emailVerified) {
        result.redirect = `/message?title=Verify Your Email&description=Check your inbox for a verification link to complete your registration.&redirect=false`;
      }
      
      return result;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post("/user/register", userData);
      
      setUnlocked(false);
      setError(null);

      const result = { ...response.data };
      
      // Add redirect to message page after registration
      if (response.data.success) {
        result.redirect = `/message?title=Registration Successful&description=A verification email has been sent to your inbox. Please check your email and click the verification link to complete your registration.&redirect=false`;
      }
      
      return result;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/user/logout");
      setUser(null);
      setUnlocked(false);
      setError(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      setUser(null);
      setUnlocked(false);
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    error,
    unlocked,
    login,
    register,
    logout,
    setUnlocked,
    isAuthenticated: !!user,
    isEmailVerified: !!user?.emailVerified
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

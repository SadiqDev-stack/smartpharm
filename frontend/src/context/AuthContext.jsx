import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unlocked, setUnlockedState] = useState(() => {
    return typeof window !== "undefined" && window.sessionStorage?.getItem("unlocked") === "true";
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const saveUnlocked = (value) => {
    setUnlockedState(value);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("unlocked", value ? "true" : "false");
    }
  };

  const checkAuth = async () => {
    try {
      const response = await api.get("/user/profile");
      setUser(response.data.user || response.data.data?.user || null);
      setError(null);
    } catch (err) {
      setUser(null);
      saveUnlocked(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post("/user/authenticate", { email, password });
      const userData = response.data.user || response.data.data?.user || null;
      setUser(userData);
      saveUnlocked(false);
      setError(null);
      return response.data;
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
      await checkAuth();
      saveUnlocked(false);
      setError(null);
      return response.data;
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
      saveUnlocked(false);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const value = {
    user,
    loading,
    error,
    unlocked,
    login,
    register,
    logout,
    setUnlocked: saveUnlocked,
    isAuthenticated: !!user,
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

import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import useStorage from "../hooks/useStorage";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser, unlocked , setUnlocked} = useStorage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 


  const checkAuth = async () => {
    setLoading(true);
    try {
      if (!user) {
        const response = await api.get("/user/profile");
        const { data } = response;

        if (data.message) setError(data.message);
        if (data.redirect) {
          setTimeout(() => {
            navigate(data.redirect);
          }, 3000);
        }
        if (!data.success) return;
        if (data.user) setUser(data.user);
      } else {
        // check last login and
      }
    } catch (er) {
      setUser(null);
      setUnlocked(false);
      setError(er.message);
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
      setUnlocked(false);
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
      setUnlocked(false);
      setError(null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      setUser(null);
      navigate("/");
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
    setUnlocked: setUnlocked,
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

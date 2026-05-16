import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useStorage from "../hooks/useStorage";
import Unlock from "../pages/Unlock";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading  } = useAuth();
  const { unlocked } = useStorage();

  if (loading) {
    return <div className="min-h-screen bg-white text-[var(--primary)] flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=login" replace />;
  }else if(!unlocked){
      return <Unlock />
  }

  return children;
};

export default ProtectedRoute;

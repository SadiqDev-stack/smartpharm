
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useStorage from "../hooks/useStorage";
import Unlock from "../pages/Unlock";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading} = useAuth();
  const { unlocked } = useStorage();
  console.log(unlocked)

  // Show modern blur loader while checking auth
  if (loading) {
    return <Loader fullScreen={true} text="loading please wait..." />;
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  // Authenticated but app is locked (passcode required)
  if (!unlocked) {
    return <Unlock />;
  }

  // Authenticated and unlocked - render children
  return children;
};

export default ProtectedRoute;
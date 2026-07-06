import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Patients from "./pages/Patients";
import Loans from "./pages/Loans";
import Invoices from "./pages/Invoices";
import Expiry from "./pages/Expiry";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Message from "./pages/Message";
import Assistant from "./pages/Assistant";
import Unlock from "./pages/Unlock";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Navigation from "./components/Navigation";
import Contact from "./pages/Contact";
import { StorageProvider } from "./context/StorageContext";

const App = () => {
  return (
    <BrowserRouter>
      <StorageProvider>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/message" element={<Message />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route
              path="/unlock"
              element={
                <ProtectedRoute>
                  <Unlock />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/products/*"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/patients"
              element={
                <ProtectedRoute>
                  <Patients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/loans"
              element={
                <ProtectedRoute>
                  <Loans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/invoices"
              element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/expiry"
              element={
                <ProtectedRoute>
                  <Expiry />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shared/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </StorageProvider>
    </BrowserRouter>
  );
};

export default App;

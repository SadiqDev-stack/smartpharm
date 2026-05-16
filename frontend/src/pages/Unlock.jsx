import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Shield, Lock, CheckCircle } from "lucide-react";
import Navigation from "../components/Navigation";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import useStorage from "../hooks/useStorage";

const Unlock = () => {
  const { user, setUnlocked } = useStorage();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to auth if no user
  React.useEffect(() => {
    if (!user) {
      navigate("/auth?mode=login", { replace: true });
    }
  }, [user, navigate]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError(null);
    if (!pin.trim()) return setError("Enter your passcode.");
    
    setLoading(true);
    try {
      if (pin === user.passCode) {
        setUnlocked(true);
        navigate("/user/dashboard", { replace: true });
      } else {
        setUnlocked(false);
        setError("Invalid passcode. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl border border-[var(--border)] shadow-xl p-10 text-center">
          <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[var(--primary)]">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-3">
            Enter your passcode
          </h1>
          <p className="text-[var(--text-muted)] mb-8">
            For extra security, enter your dashboard passcode before continuing.
          </p>
          <form onSubmit={handleUnlock} className="space-y-5">
            <div className="max-w-sm mx-auto">
              <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                Passcode
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-2xl focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                  placeholder="Enter your passcode"
                />
              </div>
              {error && <p className="text-sm text-[var(--accent-red)] mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-3 text-white font-semibold hover:bg-[var(--primary-dark)] transition disabled:opacity-50"
            >
              {loading ? "Checking..." : "Unlock Dashboard"}
              {loading ? null : <CheckCircle className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Unlock;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, CheckCircle } from "lucide-react";
import Navigation from "../components/Navigation";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Unlock = () => {
  const { user, setUnlocked } = useAuth();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError(null);
    if (!pin.trim()) return setError("Enter your passcode.");

    setLoading(true);
    try {
      const response = await api.post("/user/verify-pin", { passCode: pin });
      if (response.data.success) {
        setUnlocked(true);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Unable to unlock dashboard.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid passcode. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-10 text-center">
          <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0F6E8A]">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-3">Enter your passcode</h1>
          <p className="text-[#64748B] mb-8">
            For extra security, enter your dashboard passcode before continuing.
          </p>
          <form onSubmit={handleUnlock} className="space-y-5">
            <div className="max-w-sm mx-auto">
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Passcode</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] rounded-2xl focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A]"
                  placeholder="Enter your passcode"
                />
              </div>
              {error && <p className="text-sm text-[#EF4444] mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F6E8A] px-8 py-3 text-white font-semibold hover:bg-[#0A4D62] transition disabled:opacity-50"
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

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, CheckCircle, AlertCircle } from "lucide-react";
import useStorage from "../hooks/useStorage";

const Unlock = () => {
  const { user, setUnlocked } = useStorage();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Redirect to auth if no user
  React.useEffect(() => {
    if (!user) {
      navigate("/auth?mode=login", { replace: true });
    }
  }, [user, navigate]);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
    setError(null);

    // Auto-submit when 4 digits are entered
    if (value.length === 4) {
      handleUnlock(value);
    }
  };

  const handleUnlock = async (passcode) => {
    setError(null);
    setLoading(true);

    try {
      if (passcode === user.passCode) {

        setSuccess(true);
        setUnlocked(true);
        // Wait for animation to complete before navigating
        setTimeout(() => {
          navigate("/user/dashboard", { replace: true });
        }, 1500);
      } else {
        setUnlocked(false);
        setPin("");
        setError("Invalid passcode. Please try again.");
        inputRef.current?.focus();
      }
    } catch (err) {
      setPin("");
      setError("An error occurred. Please try again.");
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length === 4) {
      handleUnlock(pin);
    } else {
      setError("Passcode must be exactly 4 digits.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-light)] to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className={`bg-white rounded-3xl border transition-all duration-500 shadow-2xl p-8 text-center ${
          success 
            ? 'border-green-500 bg-gradient-to-br from-white to-green-50' 
            : 'border-[var(--border)]'
        }`}>
          {/* Icon */}
          <div className={`mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
            success 
              ? 'bg-green-100 text-green-600 scale-110 animate-pulse' 
              : 'bg-[#E0F2FE] text-[var(--primary)]'
          }`}>
            {success ? (
              <CheckCircle className="w-12 h-12" />
            ) : (
              <Shield className="w-12 h-12" />
            )}
          </div>

          <h1 className={`text-3xl font-bold mb-2 transition-colors duration-500 ${
            success ? 'text-green-600' : 'text-[var(--text-dark)]'
          }`}>
            {success ? "Access Granted!" : "Enter your passcode"}
          </h1>
          
          <p className={`mb-8 transition-colors duration-500 ${
            success 
              ? 'text-green-600' 
              : 'text-[var(--text-muted)]'
          }`}>
            {success 
              ? "You will be redirected to your dashboard."
              : "For extra security, enter your 4-digit dashboard passcode."}
          </p>

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-dark)] mb-3">
                  4-Digit Passcode
                </label>
                
                {/* PIN Input Display */}
                <div className="flex justify-center gap-3 mb-4">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`w-14 h-16 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                        index < pin.length
                          ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                          : error
                          ? 'border-[var(--accent-red)] bg-red-50'
                          : 'border-[var(--border)] bg-[var(--bg-light)]'
                      }`}
                    >
                      {pin[index] ? "•" : ""}
                    </div>
                  ))}
                </div>

                {/* Hidden Input */}
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  maxLength="4"
                  value={pin}
                  onChange={handlePinChange}
                  placeholder="Enter 4 digits"
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-transparent rounded-xl focus:outline-none focus:border-[var(--primary)] bg-[var(--bg-light)] text-center text-lg font-semibold tracking-widest transition-all"
                  autoComplete="off"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 animate-shake">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || pin.length !== 4}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading || pin.length !== 4
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] active:scale-95'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Unlock Dashboard
                  </>
                )}
              </button>

              <p className="text-xs text-[var(--text-muted)]">
                {pin.length}/4 digits entered
              </p>
            </form>
          )}

          {/* Success Message */}
          {success && (
            <div className="animate-bounce">
              <div className="text-6xl mb-4">✓</div>
              <p className="text-green-600 font-semibold">Redirecting to dashboard...</p>
            </div>
          )}
        </div>

        {/* Footer Help */}
        {!success && (
          <p className="text-center text-xs text-[var(--text-muted)] mt-6">
            Enter only numbers • Auto-submits after 4 digits
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Unlock;

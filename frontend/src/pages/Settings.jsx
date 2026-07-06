import React, { useState, useContext } from "react";
import Navigation from "../components/Navigation";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  LogOut,
  Save,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { StorageContext } from "../context/StorageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user } = useContext(StorageContext);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/auth?mode=login", { replace: true });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-2">
            Settings
          </h1>
          <p className="text-[var(--text-muted)]">
            Manage your account and application preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-3xl bg-white p-4 shadow-lg border border-[var(--border)] space-y-2">
              <button
                onClick={() => setActiveTab("general")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "general"
                    ? "bg-[var(--primary)] text-white"
                    : "hover:bg-[var(--bg-light)] text-[var(--text-dark)]"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">General</span>
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "security"
                    ? "bg-[var(--primary)] text-white"
                    : "hover:bg-[var(--bg-light)] text-[var(--text-dark)]"
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Security</span>
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "notifications"
                    ? "bg-[var(--primary)] text-white"
                    : "hover:bg-[var(--bg-light)] text-[var(--text-dark)]"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="text-sm font-medium">Notifications</span>
              </button>

              <button
                onClick={() => setActiveTab("appearance")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === "appearance"
                    ? "bg-[var(--primary)] text-white"
                    : "hover:bg-[var(--bg-light)] text-[var(--text-dark)]"
                }`}
              >
                <Palette className="w-5 h-5" />
                <span className="text-sm font-medium">Appearance</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white p-8 shadow-lg border border-[var(--border)]">
              {saved && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded-lg text-green-800 text-sm">
                  ✓ Settings saved successfully
                </div>
              )}

              {/* General Tab */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
                    General Settings
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name || ""}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ""}
                      disabled
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--bg-light)] text-[var(--text-muted)] cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={user?.phone || ""}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.shopDescription?.name || ""}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                      placeholder="Enter your shop name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Address
                    </label>
                    <textarea
                      rows="3"
                      defaultValue={user?.address || ""}
                      className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] resize-none"
                      placeholder="Enter your address"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-dark)] transition"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
                    Security Settings
                  </h2>

                  <div className="p-4 bg-[var(--bg-light)] rounded-lg border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-[var(--text-dark)]">
                          Change Password
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          Update your password to keep your account secure
                        </p>
                      </div>
                      <Lock className="w-5 h-5 text-[var(--text-muted)]" />
                    </div>
                    <button className="text-[var(--primary)] font-medium hover:underline">
                      Change Password
                    </button>
                  </div>

                  <div className="p-4 bg-[var(--bg-light)] rounded-lg border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-[var(--text-dark)]">
                          Dashboard Passcode
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          Manage your 4-digit passcode for quick access
                        </p>
                      </div>
                    </div>
                    <button className="text-[var(--primary)] font-medium hover:underline">
                      Update Passcode
                    </button>
                  </div>

                  <div className="p-4 bg-[var(--bg-light)] rounded-lg border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-[var(--text-dark)]">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                    </div>
                    <button className="text-[var(--primary)] font-medium hover:underline">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[var(--bg-light)] rounded-lg">
                      <div>
                        <h3 className="font-medium text-[var(--text-dark)]">
                          Email Notifications
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          Receive updates via email
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[var(--bg-light)] rounded-lg">
                      <div>
                        <h3 className="font-medium text-[var(--text-dark)]">
                          Low Stock Alerts
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          Notify when product stock is low
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[var(--bg-light)] rounded-lg">
                      <div>
                        <h3 className="font-medium text-[var(--text-dark)]">
                          Expiry Reminders
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          Get reminded of expiring products
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
                    Appearance Settings
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-3">
                      Theme
                    </label>
                    <div className="flex gap-4">
                      <button className="px-6 py-2.5 rounded-lg border-2 border-[var(--primary)] bg-white text-[var(--primary)] font-medium">
                        Light
                      </button>
                      <button className="px-6 py-2.5 rounded-lg border-2 border-[var(--border)] bg-white text-[var(--text-dark)] font-medium hover:border-[var(--primary)]">
                        Dark
                      </button>
                      <button className="px-6 py-2.5 rounded-lg border-2 border-[var(--border)] bg-white text-[var(--text-dark)] font-medium hover:border-[var(--primary)]">
                        Auto
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-3">
                      Language
                    </label>
                    <select className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]">
                      <option>English</option>
                      <option>Yoruba</option>
                      <option>Igbo</option>
                      <option>Hausa</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-lg font-medium border border-red-200 hover:bg-red-100 transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

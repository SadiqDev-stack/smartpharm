import React from "react";
import Navigation from "../components/Navigation";
import { Bell, Check, Trash2 } from "lucide-react";

const Notifications = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-2">
            Notifications
          </h1>
          <p className="text-[var(--text-muted)]">
            Manage your alerts and notifications
          </p>
        </div>

        <div className="grid gap-6">
          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                  <Bell className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-dark)]">
                    Notification Center
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    No new notifications
                  </p>
                </div>
              </div>
              <button className="text-[var(--text-muted)] hover:text-[var(--text-dark)]">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)]">
            <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-4">
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[var(--bg-light)] rounded-lg">
                <div>
                  <p className="font-medium text-[var(--text-dark)]">
                    Product Alerts
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Get notified about low stock and expiry
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
                  <p className="font-medium text-[var(--text-dark)]">
                    Patient Updates
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Get notified about patient records
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
                  <p className="font-medium text-[var(--text-dark)]">
                    Loan Reminders
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Get notified about pending loans
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded cursor-pointer"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Notifications;

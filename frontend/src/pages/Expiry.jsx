import React from "react";
import Navigation from "../components/Navigation";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";

const Expiry = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-2">
            Expiry Management
          </h1>
          <p className="text-[var(--text-muted)]">
            Track and manage product expiry dates
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)] hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-dark)]">
                Expired
              </h2>
            </div>
            <p className="text-3xl font-bold text-red-600 mb-2">0</p>
            <p className="text-[var(--text-muted)] text-sm">
              Products past expiry date
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)] hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-dark)]">
                Expiring Soon
              </h2>
            </div>
            <p className="text-3xl font-bold text-yellow-600 mb-2">0</p>
            <p className="text-[var(--text-muted)] text-sm">
              Expiring within 30 days
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)] hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-dark)]">
                Valid
              </h2>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-2">0</p>
            <p className="text-[var(--text-muted)] text-sm">
              Products still valid
            </p>
          </section>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)]">
          <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-4">
            Recent Activity
          </h2>
          <div className="text-center py-12">
            <p className="text-[var(--text-muted)]">
              No expiry records to display yet. Add products to start tracking expiry dates.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Expiry;

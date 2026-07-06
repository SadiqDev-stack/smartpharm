import React from "react";
import Navigation from "../components/Navigation";
import { BarChart3, TrendingUp, Users, ShoppingCart } from "lucide-react";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-2">
            Analytics & Reports
          </h1>
          <p className="text-[var(--text-muted)]">
            View insights and performance metrics
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4 mb-8">
          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)] hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-[var(--text-muted)]">
                Total Sales
              </h2>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--text-dark)] mb-2">
              ₦0
            </p>
            <p className="text-xs text-green-600">
              ↑ 0% from last month
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)] hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-[var(--text-muted)]">
                Patients
              </h2>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--text-dark)] mb-2">
              0
            </p>
            <p className="text-xs text-blue-600">
              ↑ 0% from last month
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)] hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-[var(--text-muted)]">
                Active Loans
              </h2>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--text-dark)] mb-2">
              0
            </p>
            <p className="text-xs text-purple-600">
              ↑ 0% from last month
            </p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)] hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-[var(--text-muted)]">
                Invoices
              </h2>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--text-dark)] mb-2">
              0
            </p>
            <p className="text-xs text-orange-600">
              ↑ 0% from last month
            </p>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)]">
            <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-4">
              Sales Trend
            </h2>
            <div className="h-64 flex items-center justify-center bg-[var(--bg-light)] rounded-lg">
              <p className="text-[var(--text-muted)]">
                Chart placeholder - No data available
              </p>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)]">
            <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-4">
              Top Products
            </h2>
            <div className="h-64 flex items-center justify-center bg-[var(--bg-light)] rounded-lg">
              <p className="text-[var(--text-muted)]">
                List placeholder - No data available
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Analytics;

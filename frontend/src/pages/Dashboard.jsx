import React from "react";
import Navigation from "../components/Navigation";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)] hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-[var(--text-dark)]">Overview</h2>
            <p className="text-[var(--text-muted)] mt-2">A clean dashboard for products, loans, patients, and invoices.</p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)] hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-[var(--text-dark)]">Next action</h2>
            <p className="text-[var(--text-muted)] mt-2">Use the left navigation links to manage inventory and records.</p>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-lg border border-[var(--border)] hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-[var(--text-dark)]">Quick links</h2>
            <p className="text-[var(--text-muted)] mt-2">Products, patients, loans, invoices, and daily stock checks.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

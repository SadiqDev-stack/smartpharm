import React from "react";
import Navigation from "../components/Navigation";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-3xl bg-slate-900 p-6 shadow-xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <p className="text-slate-400 mt-2">A clean dashboard for products, loans, patients, and invoices.</p>
          </section>

          <section className="rounded-3xl bg-slate-900 p-6 shadow-xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white">Next action</h2>
            <p className="text-slate-400 mt-2">Use the left navigation links to manage inventory and records.</p>
          </section>

          <section className="rounded-3xl bg-slate-900 p-6 shadow-xl border border-slate-800">
            <h2 className="text-xl font-semibold text-white">Quick links</h2>
            <p className="text-slate-400 mt-2">Products, patients, loans, invoices, and daily stock checks.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

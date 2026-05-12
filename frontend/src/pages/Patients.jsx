import React from "react";
import Navigation from "../components/Navigation";

const Patients = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-slate-900 p-6 shadow-xl border border-slate-800">
          <h1 className="text-2xl font-semibold">Patients</h1>
          <p className="text-slate-400 mt-2">Track patient details, dosage schedule, and treatment history easily.</p>
        </div>
      </main>
    </div>
  );
};

export default Patients;

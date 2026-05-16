import React from "react";
import Navigation from "../components/Navigation";

const Invoices = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-white p-6 shadow-lg border border-[#E2E8F0] hover:shadow-xl transition">
          <h1 className="text-2xl font-semibold text-[#1E293B]">Invoices</h1>
          <p className="text-[#64748B] mt-2">Record purchasing and selling invoices with simple invoice tracking.</p>
        </div>
      </main>
    </div>
  );
};

export default Invoices;

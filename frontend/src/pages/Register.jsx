import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    shopName: "",
    shopeDescription: '',
    shopeType: "small"
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900/95 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-semibold mb-4">Create account</h1>
        <p className="text-slate-400 mb-6">Start managing pharmacy inventory, patients, and payments today.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-slate-300 text-sm">Shop name</span>
            <input
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>

            <label className="block">
            <span className="text-slate-300 text-sm">Shop Description</span>
            <input
              name="shopName"
              value={form.shopeDescription}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>

            <label className="block">
            <span className="text-slate-300 text-sm">Shop name</span>
          <select className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500" onSelect={handleChange} name="" value={form.shopeType} id="">
            <option selected value="small">small</option>
            <option value="medium">medium</option>
            <option value="enterprice">enterprise</option>
          </select>
          </label>

          <label className="block">
            <span className="text-slate-300 text-sm">Your name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>
          <label className="block">
            <span className="text-slate-300 text-sm">Phone</span>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>
          <label className="block">
            <span className="text-slate-300 text-sm">Address</span>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="text-slate-300 text-sm">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="text-slate-300 text-sm">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            />
          </label>

          {error && <p className="text-rose-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-slate-400 text-sm mt-6">
          Already have an account? <Link className="text-emerald-400 hover:text-emerald-300" to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

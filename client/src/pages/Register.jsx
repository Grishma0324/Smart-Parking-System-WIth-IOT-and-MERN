import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    userType: "student",
    vehicleNumber: "",
    vehicleType: "4-wheeler",
    rfidCardId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="card space-y-4">
        {error && <div className="bg-red-500/10 border border-danger text-danger text-sm p-2 rounded">{error}</div>}

        <div>
          <label className="label">Full Name</label>
          <input className="input" required value={form.fullName} onChange={set("fullName")} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" required value={form.email} onChange={set("email")} />
          </div>
          <div>
            <label className="label">Mobile Number</label>
            <input className="input" required value={form.mobile} onChange={set("mobile")} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" required value={form.password} onChange={set("password")} />
          </div>
          <div>
            <label className="label">Confirm Password</label>
            <input type="password" className="input" required value={form.confirmPassword} onChange={set("confirmPassword")} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">User Type</label>
            <select className="input" value={form.userType} onChange={set("userType")}>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
          <div>
            <label className="label">Vehicle Type</label>
            <select className="input" value={form.vehicleType} onChange={set("vehicleType")}>
              <option value="4-wheeler">4-Wheeler</option>
              <option value="2-wheeler">2-Wheeler</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Vehicle Number</label>
            <input className="input" value={form.vehicleNumber} onChange={set("vehicleNumber")} />
          </div>
          <div>
            <label className="label">RFID Card ID (optional)</label>
            <input className="input" value={form.rfidCardId} onChange={set("rfidCardId")} />
          </div>
        </div>

        <button className="btn-primary w-full" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
        <p className="text-sm text-slate-400 text-center">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

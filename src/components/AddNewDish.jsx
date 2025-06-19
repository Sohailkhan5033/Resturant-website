import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddDishPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", type: "", price: "", image: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://resturant-website-production-7209.up.railway.app/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) })
    });
    navigate("/menu");
  };

  return (
    <div className="container py-4">
      <button className="btn btn-secondary mb-4" onClick={() => navigate("/menu")}>Back to Menu</button>
      {""}
      <h2>Add New Dish</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {["name","type","price","image"].map((field) => (
          <div className="col-md-6" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
            <input
              type={field==="price"?"number":"text"}
              step={field==="price"? "0.01": undefined}
              className="form-control"
              value={form[field]}
              onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
              required
            />
          </div>
        ))}
        <div className="col-12">
          <button className="btn btn-success">Create Dish</button>
        </div>
      </form>
    </div>
  );
}

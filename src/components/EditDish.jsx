import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Environment-based API URL
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://resturant-website-production-b394.up.railway.app";

export default function EditDishPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { dish } = location.state || {};

  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    image: ""
  });

  // ✅ Fetch dish details on mount (if not passed via navigation)
  useEffect(() => {
    if (dish) {
      setForm(dish);
    } else {
      axios
        .get(`${BASE_URL}/dishes/${id}`)
        .then((res) => setForm(res.data))
        .catch((err) => {
          console.error("Dish not found", err);
          alert("Dish not found");
          navigate("/menu");
        });
    }
  }, [id, dish, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.type || !form.image) {
      return alert("Please fill in all fields before saving.");
    }

    const payload = {
      id: Number(id),
      name: form.name,
      type: form.type,
      price: parseFloat(form.price),
      image: form.image
    };

    try {
      await axios.put(`${BASE_URL}/dishes/${id}`, payload);
      alert("Dish updated successfully!");
      navigate("/menu", { state: { updated: true } });
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update dish: " + err.message);
    }
  };

  return (
    <div className="container py-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate("/menu")}>
        ← Back to Menu
      </button>

      <div className="mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4">Edit Dish</h3>

        <form onSubmit={handleSubmit} className="border p-4 shadow rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Dish Name</label>
            <input
              type="text"
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <input
              type="text"
              className="form-control"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/menu")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MenuPage() {
  const [dishes, setDishes] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const location = useLocation();

  // On mount: Load admin state and dishes
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }

   fetch("https://resturant-website-production-7209.up.railway.app/dishes")
      .then(res => res.json())
      .then(data => setDishes(data))
      .catch(err => console.error("Failed to load dishes:", err));
  }, [location.state?.updated]);

  const filteredDishes = dishes
    .filter(d => d.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  const handleAdminLogin = async () => {
    try {
      const res = await fetch("http://localhost:4000/admins");
      const data = await res.json();
      const admin = data.find(
        a => a.email === adminCredentials.email && a.password === adminCredentials.password
      );
      if (admin) {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
        setShowLogin(false);
        setAdminCredentials({ email: "", password: "" });
      } else {
        alert("Incorrect credentials");
      }
    } catch (err) {
      alert("Error connecting to admin DB: " + err.message);
    }
  };

  const handleDelete = async index => {
    const dishToDelete = filteredDishes[index];
    if (!window.confirm("Are you sure to delete this dish?")) return;

    try {
      const res = await fetch(`http://localhost:4000/dishes/${dishToDelete.id}`, { method: "DELETE" });
      if (res.ok) {
        setDishes(prev => prev.filter(d => d.id !== dishToDelete.id));
      } else throw new Error("Delete request failed");
    } catch (err) {
      alert("Failed to delete dish: " + err.message);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    alert("Logged out as Admin");
  };

  return (
    <div className="container py-4 min-vh-100">
      {showLogin && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "#00000088" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Admin Login</h5>
                <button className="btn-close" onClick={() => setShowLogin(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Admin Email"
                  value={adminCredentials.email}
                  onChange={e => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={adminCredentials.password}
                  onChange={e => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary w-100" onClick={handleAdminLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>← Home</button>

        <h3 className="text-danger fw-bold">Foodie Place Menu</h3>

        {isAdmin ? (
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout Admin</button>
        ) : (
          <button className="btn btn-danger" onClick={() => setShowLogin(true)}>Admin Login</button>
        )}
      </div>

      {/* Filter/Sort + Add Dish */}
      <div className="row mb-4">
        <div className="col-md-8 d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search your favorite dish..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <select className="form-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
        {isAdmin && (
          <div className="col-md-4 text-md-end mt-2 mt-md-0">
            <button className="btn btn-success w-100" onClick={() => navigate("/add-dish")}>
               Add New Dish
            </button>
          </div>
        )}
      </div>

      {/* Dish Cards */}
      <div className="row g-4">
        {filteredDishes.map((dish, idx) => (
          <div className="col-6 col-sm-4 col-md-3 foodcard" key={dish.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={dish.image}
                className="card-img-top"
                alt={dish.name}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between bg-warning-subtle">
                <h5 className="card-title">{dish.name}</h5>
                <p className="text-muted text-capitalize mb-1">{dish.type}</p>
                <h6 className="text-success fw-bold">${dish.price.toFixed(2)}</h6>

                {isAdmin ? (
                  <div className="mt-3 d-grid gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/edit-dish/${dish.id}`, { state: { dish } })}
                    >
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(idx)}>
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-warning mt-3"
                    onClick={() => navigate("/order", { state: { dish } })}
                  >
                     Order Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

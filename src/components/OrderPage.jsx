import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dish = location.state?.dish;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    paymentMethod: ""
  });

  if (!dish) {
    return <div className="text-center py-5">No dish selected.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      dishName: dish.name,
      pricePerItem: dish.price,
      total: dish.price * formData.quantity,
    };

    fetch("http://localhost:4000/clientsInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    })
      .then((res) => {
        if (res.ok) {
          alert("Order placed successfully!");
          navigate("/");
        } else {
          throw new Error("Failed to submit order");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    
    <div className="container py-5" style={{ background: "#f2f7ff" }}>
     <button className="btn btn-secondary" onClick={() => navigate("/menu")}>Back to Menu</button>
      <h2 className="text-center mb-4">🍔 Order for {dish.name}</h2>
      <img src={dish.image} alt={dish.name} style={{ width: "200px", borderRadius: "10px" }} className="d-block mx-auto mb-3" />
      <h5 className="text-center text-muted mb-4">Price per item: ${dish.price.toFixed(2)}</h5>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
        <input name="name" onChange={handleChange} className="form-control mb-2" placeholder="Full Name" required />
        <input name="email" type="email" onChange={handleChange} className="form-control mb-2" placeholder="Email Address" required />
        <input name="phone" onChange={handleChange} className="form-control mb-2" placeholder="Phone Number" required />
        <input name="address" onChange={handleChange} className="form-control mb-2" placeholder="Delivery Address" required />
        <input name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} className="form-control mb-2" required />

        <select name="paymentMethod" onChange={handleChange} className="form-select mb-3" required>
          <option value="">Select Payment Method</option>
          <option value="jazzcash">JazzCash</option>
          <option value="easypaisa">EasyPaisa</option>
          <option value="cod">Cash on Delivery</option>
        </select>

        <div className="text-center fw-bold mb-3">
          Total: ${ (dish.price * formData.quantity).toFixed(2) }
        </div>

        <button className="btn btn-success w-100" type="submit">
          Confirm Order
        </button>
      </form>
    </div>
  );
}

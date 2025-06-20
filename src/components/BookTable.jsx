import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:4000"
  : "https://resturant-website-production-b394.up.railway.app";


const bookedTables = [2, 5, 7, 9];
const bookedBirthdayAreas = [1];


const tableData = [
  ...Array.from({ length: 10 }, (_, i) => ({ id: i + 1, type: 'table' })),
  { id: 1, type: 'birthday' },
  { id: 2, type: 'birthday' },
  { id: 1, type: 'anniversary' },
  { id: 2, type: 'anniversary' },
];

export default function BookTable() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    duration: 1,
    tableType: 'round',
    seating: 'chairs',
    section: 'table',
    people: 2
  });

  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Calculate price dynamically
  useEffect(() => {
    calculatePrice();
  }, [formData]);

  const calculatePrice = () => {
    let total = 20;

    if (['birthday', 'anniversary', 'family'].includes(formData.section)) total += 25;
    if (formData.seating === 'sofa') total += 15;
    if (formData.tableType === 'round') total += 10;
    if (formData.people > 4) total += (formData.people - 4) * 5;
    if (formData.duration > 1) total += (formData.duration - 1) * 10;

    setPrice(total);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'people' || name === 'duration' ? parseInt(value) : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
  
    // Check if already booked
    if (
      (formData.section === 'table' && bookedTables.includes(formData.people)) ||
      (formData.section === 'birthday' && bookedBirthdayAreas.includes(1))
    ) {
      setError('Selected table or section is already booked. Please choose another one.');
      return;
    }
  
    setError('');
  
    const bookingData = {
      ...formData,
      totalPrice: price,
      createdAt: new Date().toISOString()
    };
  
    try {
      const res = await fetch(`${BASE_URL}/tableBookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      });
  
      if (!res.ok) throw new Error("Failed to book table");
  
      alert(` Table booked successfully for ${formData.name}`);
  
      // Reset form
      setFormData({
        name: '',
        date: '',
        time: '',
        duration: 1,
        tableType: 'round',
        seating: 'chairs',
        section: 'table',
        people: 2
      });
    } catch (err) {
      console.error("Booking error:", err);
      setError("Something went wrong while booking. Please try again.");
    }
  };
  

  return (
    <div className="container my-5">
     <button className="btn btn-primary" onClick={() => navigate("/")}>← Back to Home</button>
      <h2 className="text-center mb-4">Reserve Your Table</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-md-6">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" name="name" required value={formData.name} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Date:</label>
          <input type="date" className="form-control" name="date" required value={formData.date} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Time:</label>
          <input type="time" className="form-control" name="time" required value={formData.time} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Duration (hrs):</label>
          <input type="number" className="form-control" name="duration" min="1" value={formData.duration} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Table Style:</label>
          <select name="tableType" className="form-select" value={formData.tableType} onChange={handleChange}>
            <option value="round">Round</option>
            <option value="rectangle">Rectangle</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Seating:</label>
          <select name="seating" className="form-select" value={formData.seating} onChange={handleChange}>
            <option value="chairs">Chairs</option>
            <option value="sofa">Sofa</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Section:</label>
          <select name="section" className="form-select" value={formData.section} onChange={handleChange}>
            <option value="table">Regular Table</option>
            <option value="birthday">Birthday Area</option>
            <option value="anniversary">Anniversary Section</option>
            <option value="family">Family Gathering</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Number of People:</label>
          <input type="number" className="form-control" name="people" min="1" value={formData.people} onChange={handleChange} />
        </div>

        <div className="col-12">
          <div className="alert alert-info text-center">
            💵 <strong>Total Price:</strong> ${price.toFixed(2)}
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">Book Now</button>
        </div>
      </form>

      <hr className="my-5" />

      <h4 className="text-center mb-4">Table Availability</h4>
      <div className="row g-3">
        {tableData.map((table, i) => {
          const isBooked =
            (table.type === 'table' && bookedTables.includes(table.id)) ||
            (table.type === 'birthday' && bookedBirthdayAreas.includes(table.id));

          return (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={i}>
              <div className={`border text-center p-3 rounded ${isBooked ? 'bg-danger text-white' : 'bg-success text-white'}`}>
                {table.type === 'table'
                  ? `Table ${table.id}`
                  : `${table.type.charAt(0).toUpperCase() + table.type.slice(1)} Area ${table.id}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

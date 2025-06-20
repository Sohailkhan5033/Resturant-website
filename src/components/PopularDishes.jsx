import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/dishes"
    : "https://resturant-website-production-b394.up.railway.app/dishes";


export default function PopularDishes() {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  // Fetching dishes 
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(URL);
        const popularIds = ['1', '8', '15', '25']; // your selected dish IDs
        const filtered = response.data.filter(d => popularIds.includes(d.id.toString()));
        setDishes(filtered);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
  
    fetchDishes();
  }, []);
  
 
  const handleOrderClick = () => {
    navigate('/menu'); 
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5">Foodie Place Most Popular Dishes</h2>
        <div className="row justify-content-center">
          {dishes.map((d, i) => (
            <div key={i} className="col-sm-6 col-md-4 col-lg-3 mb-4 food-card">
              <div className="card h-100">
                <img src={d.image} className="card-img-top" alt={d.name} />
                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title">{d.name}</h5>
                  <p className="card-text">Price: ${d.price}</p>
                  <button onClick={handleOrderClick} className="btn btn-warning mt-auto">Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

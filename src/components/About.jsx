import React from 'react';
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();
  return (

    <div className="about-page py-5" style={{ backgroundColor: '#ffeedb' }}>
        <button className="btn btn-primary btn-of-about" onClick={() => navigate("/")}>
  ← Back to Home
</button>


      <div className="container">
        <h1 className="text-center mb-4 text-danger fw-bold">About Foodie Place</h1>

        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-md-6 mb-4">
            <div className="p-4 rounded shadow bg-white h-100">
              <h3 className="text-primary mb-3">Our Journey</h3>
              <p>
                Since 2015, <strong>Foodie Place</strong> has been on a mission to bring mouthwatering global flavors to your plate. 
                We blend culinary traditions with modern tastes, ensuring every meal is an experience worth remembering.
              </p>
              <p>
                From cozy dining nights to flavorful catering events, we take pride in creating meals that feel like home—
                no matter where you're from.
              </p>
              <p><strong>Founder:</strong> SOHAIL KHAN</p>
              <p><strong>Head Chef:</strong> Chef SOHAIL KHAN</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6 mb-4">
            <div className="p-4 rounded shadow bg-white h-100">
              <h3 className="text-primary mb-3">Contact & Location</h3>
              <ul className="list-unstyled">
                <li><strong>Email:</strong> contact@foodieplace.com</li>
                <li><strong>Phone:</strong> +123-456-7890</li>
                <li><strong>Address:</strong> 123 Flavor St, Spice City</li>
              </ul>

              <hr className="my-4" />

              <h5 className="text-uppercase text-secondary">Follow Us</h5>
              <div className="social-icons mt-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3 fs-4 text-primary">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-3 fs-4 text-danger">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-3 fs-4 text-info">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="fs-4 text-danger">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-5" />
        <p className="text-center text-muted">
          &copy; 2025 <strong>Foodie Place</strong> | Crafted with ❤️ for food lovers around the world
        </p>
      </div>
    </div>
  );
}

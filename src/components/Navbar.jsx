import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#b22222' }}>
      <div className="container">
        <img src="/Logo.png" alt="Logo" className="img-fluid" style={{ maxHeight: '60px' }} />
        <Link className="navbar-brand" to="/">Foodie Place</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/menu">Menu</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/book-table">Book Table</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/About">About</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

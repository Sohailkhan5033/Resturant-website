import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-danger text-white pt-4 pb-2 mt-5">
      <div className="container">
        {/* Row with 3 equal columns */}
        <div className="row align-items-start text-center text-md-start">
          {/* Column 1: Brand Info */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Foodie Place</h5>
            <p>Crafting global flavors since 2015</p>
            <p><strong>Owner:</strong> SOHAIL KHAN</p>
            <p><strong>Head Chef:</strong> Chef SOHAIL KHAN</p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Contact Us</h5>
            <p>Email: contact@foodieplace.com</p>
            <p>Phone: +123-456-7890</p>
            <p>Location: 123 Flavor St, Spice City</p>
          </div>

          {/* Column 3: Follow Us */}
          <div className="col-md-4 mb-3 text-md-end" style={{ paddingRight: '50px' }}>
            <h5 className="text-uppercase">Follow Us</h5>
            <div className="social-icons mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-4">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-4">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3 fs-4">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider and Copyright */}
        <hr className="bg-light mt-4" />
        <div className="text-center">
          <p className="mb-0">&copy; 2025 Foodie Place | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

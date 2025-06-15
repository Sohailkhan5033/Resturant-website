import React from 'react';

export default function HeroSection() {
  return (
    <section className="py-5" style={{ backgroundColor: '#ffeedb' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h1>Welcome to Foodie Place</h1>
            <p className="lead mt-3">
              We serve delicious dishes inspired by flavors from around the world.<br />
              Explore a variety of mouthwatering cuisines, all in one place.<br />
              Whether you crave spicy, sweet, or savory — we’ve got something for every taste bud.<br />
              Experience global culinary delights, freshly prepared for you.<br />
              Your food adventure starts right here with us!
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img src="shenkin.jpg" alt="Delicious food" className="img-fluid rounded shadow hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

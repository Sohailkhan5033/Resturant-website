import React, { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:4000"
  : "https://resturant-website-production-b394.up.railway.app";


export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // 🔄 Fetch reviews when component loads
  useEffect(() => {
    fetch(`${BASE_URL} /reviews`)
      .then(res => res.json())
      .then(data => setReviews(data)) // save fetched reviews to state
      .catch(err => console.error("Error fetching reviews:", err));
  }, []);

  // ✅ Submit form and send POST request to db.json
  const handleSubmit = (e) => {
    e.preventDefault();

    // Getting values from the form
    const { userName, userReview, userRating } = e.target;

    // Creating new review object
    const newReview = {
      name: userName.value,
      review: userReview.value,
      rating: parseInt(userRating.value),
      date: new Date().toLocaleString()
    };

    // ⬆️ Send review to backend using POST request
    fetch("https://resturant-website-production-7209.up.railway.app/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview)
    })
      .then(res => res.json())
      .then(data => {
        // Update UI immediately after successful post
        setReviews(prev => [...prev, data]);
        e.target.reset(); // clear the form
      })
      .catch(err => console.error("Error submitting review:", err));
  };

  return (
    <section id="reviewsection" className="py-5" style={{ backgroundColor: '#fff5f5' }}>
      <div className="container">
        <h2 className="mb-4 text-center">Customer Reviews about our foodie place and our food</h2>

        {/* 👤 Show only the latest review */}
        {reviews.slice(0, 1).map((r, i) => (
          <div key={i} className="review-card mb-4">
            <h3>{r.name}</h3>
            <p>{r.review}</p>
            <p>Rating: {'★'.repeat(r.rating)}</p>
            <small>Reviewed on: {r.date}</small>
          </div>
        ))}

        {/* 👀 Toggle: show more reviews */}
        {showAll && reviews.slice(1).map((r, i) => (
          <div key={i} className="review-card mb-3">
            <h3>{r.name}</h3>
            <p>{r.review}</p>
            <p>Rating: {'★'.repeat(r.rating)}</p>
            <small>Reviewed on: {r.date}</small>
          </div>
        ))}

        <div>
          <button onClick={() => setShowAll(!showAll)} className="btn btn-primary mb-4">
            {showAll ? 'Hide' : 'See More Reviews'}
          </button>
        </div>

        {/* ✍️ Review Form */}
        <div className="mt-5">
          <h3>Leave a Review</h3>
          <form id="reviewForm" onSubmit={handleSubmit} style={{ maxWidth: '600px' }} className="mx-auto text-start">
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">Your Name</label>
              <input type="text" className="form-control" id="userName" name="userName" required />
            </div>
            <div className="mb-3">
              <label htmlFor="userReview" className="form-label">Your Review</label>
              <textarea className="form-control" id="userReview" name="userReview" rows="4" required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="userRating" className="form-label">Rating</label>
              <select className="form-select" id="userRating" name="userRating" required>
                <option value="">Choose Rating</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{'★'.repeat(n)}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-success">Submit Review</button>
          </form>
        </div>
      </div>
    </section>
  );
}

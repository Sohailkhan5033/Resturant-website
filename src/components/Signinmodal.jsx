import React, { useState } from 'react';

export default function SignInModal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // ✅ To hide Sign In section after login
  const [isSignUp, setIsSignUp] = useState(false);      // ✅ To toggle between Sign In and Sign Up mode

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // 🔐 Admin Login
    if (email === "ahamdsohail5033@gmail.com" && password === "1122") {
      alert("Welcome Admin!");
      setIsLoggedIn(true); // ✅ Hide section after login
    } else {
      try {
        const res = await fetch(`http://localhost:4000/users?email=${email}`);
        const data = await res.json();

        if (!isSignUp) {
          // ✅ Sign In Mode
          if (data.length > 0 && data[0].password === password) {
            alert("Signed in successfully!");
            setIsLoggedIn(true); // ✅ Hide section after login
          } else {
            alert("Incorrect credentials or account not found.");
          }
        } else {
          // ➕ Sign Up Mode
          if (data.length > 0) {
            alert("Account already exists! Please sign in.");
          } else {
            const register = await fetch(`http://localhost:4000/users`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
            });
            if (register.ok) {
              alert("Account created! You are now signed in.");
              setIsLoggedIn(true); // ✅ Hide section after registration
            }
          }
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Server connection error.");
      }
    }

    // ✅ Close modal
    const modalEl = document.getElementById('signInModal');
    const modalInstance = window.bootstrap?.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
    modalInstance.hide();

    e.target.reset();
  };

  return (
    <>
      {/* 🟡 Show Sign-In section only when not logged in */}
      {!isLoggedIn && (
        <section className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="container text-center">
          <h2 class="animate-expand">Sign In for Special Discounts!</h2>
            <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#signInModal">
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </div>
        </section>
      )}

      {/* 🔵 Bootstrap Modal */}
      <div className="modal fade" id="signInModal" tabIndex="-1" aria-labelledby="signInModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signInModalLabel">{isSignUp ? "Create Account" : "Sign In"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="signInForm" onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <input type="email" name="email" className="form-control" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                  <input type="password" name="password" className="form-control" placeholder="Password" required />
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between align-items-center">
                <button type="submit" className="btn" style={{ backgroundColor: '#b22222', color: '#fff' }}>
                  {isSignUp ? "Register" : "Sign In"}
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Already have an account? Sign In" : "New user? Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

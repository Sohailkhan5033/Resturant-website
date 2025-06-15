import React from "react";

export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ padding: "0.5rem 1rem", background: "#333", color: "#fff", border: "none", borderRadius: "4px" }}
    >
      {children}
    </button>
  );
}

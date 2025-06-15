import React from "react";

export function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ padding: "0.5rem", border: "1px solid #aaa", borderRadius: "4px", marginRight: "1rem" }}
    />
  );
}

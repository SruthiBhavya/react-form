import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No data available.</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Submitted Details</h2>
      <ul>
        {Object.keys(state).map((key) => (
          <li key={key}>
            <strong>{key}:</strong> {state[key]}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px",
          background: "blue",
          color: "white",
          marginTop: "20px"
        }}
      >
        Go Back
      </button>
    </div>
  );
}

export default DetailsPage;
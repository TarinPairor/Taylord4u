import React, { useState, useEffect } from "react";
import { ENDPOINT } from "../Variables";

const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    // Fetch health check status from the backend
    fetch(`${ENDPOINT}/health`)
      .then((response) => response.json())
      .then((data) => setStatus(data.status))
      .catch((error) => console.error("Error fetching health check:", error));
  }, []);

  return (
    <div>
      <h1>Health Check</h1>
      {status !== null ? (
        <p>Status: {status}</p>
      ) : (
        <p>Loading health check status...</p>
      )}
    </div>
  );
};

export default HealthCheck;

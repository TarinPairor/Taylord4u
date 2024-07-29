// src/components/SimpleLogin.tsx
import React, { useState } from "react";

const SimpleLogin: React.FC = () => {
  const [name, setName] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/simplelogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //u forgot this thats whythere was no cookie in localhost
        body: JSON.stringify({ Name: name }),
      });
      console.log(response.status);
      // Redirect to /info
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default SimpleLogin;

// Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../Variables";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Implement login logic here, similar to the backend logic
    // You may use fetch or axios to communicate with your backend API
    // Update the URL and request method accordingly

    const response = await fetch(`${ENDPOINT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", //u forgot this thats whythere was no cookie in localhost
      body: JSON.stringify({ email, pass_word: password }),
    });
    const res = await response.json();
    console.log(res);
    if (response.ok) {
      // Save the token or user data to the state or local storage
      // Redirect to the desired page (e.g., dashboard)
      navigate("/");
    } else {
      // Handle login error
      console.error("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleLogin}
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Login
      </button>
    </div>
  );
};

export default Login;

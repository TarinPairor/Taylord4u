// SimpleHome.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const SimpleHome: React.FC = () => {
  const [cookies, , removeCookie] = useCookies(["Authorization"]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if the Authorization cookie exists
    if (cookies.Authorization) {
      // Decode the user information from the token
      const tokenData = cookies.Authorization.split(".")[1];
      const decodedData = JSON.parse(atob(tokenData));

      setUser(decodedData);
    }
  }, [cookies.Authorization]);

  const handleLogout = () => {
    // Remove the Authorization cookie
    removeCookie("Authorization");

    // Redirect to the home page or perform any other necessary actions
    window.location.reload();
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.sub}!</h2>
          {/* Display posts or any other content for logged-in users */}
          {/* Add your logic to display posts here */}
          <p>Posts will be displayed here for logged-in users.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>Please log in to view posts.</p>
          <Link to="/simple/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default SimpleHome;

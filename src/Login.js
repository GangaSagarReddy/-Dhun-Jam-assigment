import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        {
          username: "DJ@4",
          password: "Dhunjam@2023",
        }
      );

      if (response.data.status === 200) {
        onLogin(response.data.data.token);
      } else {
        // Handle login failure
        console.error("Login failed");
      }
    } catch (error) {
      // Handle API error
      console.error("API error:", error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Venue Admin Login</h2>
      <div className="input-container">
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-input"
        />
      </div>
      <div className="input-container">
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-input"
        />
      </div>
      <button onClick={handleLogin} className="rounded-button">
        Sign in
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p
        style={{
          color: "white",
          marginTop: "10px",
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          marginLeft: "100px",
        }}
      >
        New Registration ?
      </p>
    </div>
  );
};

export default Login;

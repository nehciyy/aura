import React, { useState } from "react";
import InputField from "../components/InputFields";
import Button from "../components/Button";
import "../styles/LoginSignup.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Login failed. Please try again.");
        return;
      }

      const userID = data.user?._id;
      const token = data.token;

      if (!userID || !token) {
        alert("Missing user or token in response. Please try again.");
        return;
      }

      localStorage.setItem("userID", userID);
      localStorage.setItem("token", token);

      console.log("Login successful:", { userID, token });
      window.location.href = "/"; // Redirect to home page after successful login
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="login-logo">aura</h1>
        <form className="auth-form">
          <InputField
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="password"
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} styleClass="icon-button">
            Login
          </Button>
        </form>
        <p>
          don't have an account yet? <a href="/signup">sign up now!</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

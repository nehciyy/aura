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
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Login failed. Please try again.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Token stored:", data.token);
      console.log("Login successful:", data);
      window.location.href = "/";
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

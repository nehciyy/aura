import React, { useState } from "react";
import InputField from "../components/InputFields";
import Button from "../components/Button";
import "../styles/LoginSignup.css";

const SignupPage = () => {
  const [firstName, setfName] = useState("");
  const [lastName, setlName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, firstName, lastName, password }),
      });
      console.log(response);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed. Please try again.");
      } else {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="login-logo">aura</h1>
        <form className="auth-form">
          <InputField
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setfName(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(e) => setlName(e.target.value)}
          />
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
            Sign Up
          </Button>
        </form>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <p>
          have an account already? <a href="/login">login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

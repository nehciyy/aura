import React, { useState } from "react";
import InputField from "../components/InputFields";
import Button from "../components/Button";

const SignupPage = () => {
  const [firstName, setfName] = useState("");
  const [lastName, setlName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    //Authentication logic here
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
        <p>
          have an account already? <a href="/">login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

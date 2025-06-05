import React, { useState } from "react";
import InputField from "../components/InputFields";
import Button from "../components/Button";

const LoginPage = () => {
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

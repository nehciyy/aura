import React, { useState, useEffect } from "react";
import InputField from "../components/InputFields";
import Button from "../components/Button";
import "../styles/Profile.css"; // Assuming you have a CSS file for styling

const ProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUsername(user.username || "");
    }
  }, []);

  const handleSubmit = () => {
    // Update the stored user data
    const updatedUser = {
      firstName,
      lastName,
      username,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      localStorage.removeItem("user");
      alert("Your account has been deleted.");
      window.location.href = "/"; // Redirect to login page
    }
  };

  return (
    <div className="profile-container">
      <h1 className="logo">
        <a href="/">aura</a>
      </h1>
      <div className="profile-box">
        <h2>Welcome back {firstName}!</h2>
        <p>Change your profile details below:</p>
        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <InputField
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSubmit}>submit</Button>
        </form>
        <p class="danger">
          <span
            onClick={handleDeleteAccount}
            style={{
              color: "red",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            delete my account
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;

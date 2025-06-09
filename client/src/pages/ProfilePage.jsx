import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputFields";
import Button from "../components/Button";
import "../styles/Profile.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userID || !token) {
      navigate("/login");
    }
  }, [userID, token, navigate]);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (!userID || !token) {
      alert("You must be logged in to update your profile.");
      navigate("/login");
      return;
    }

    try {
      const updates = {
        username,
        firstName,
        lastName,
        password,
      };

      const response = await fetch(`${API_BASE_URL}/api/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const updateUser = await response.text();
      localStorage.setItem("user", JSON.stringify(updateUser));

      alert("Profile updated successfully!");
      setPassword(""); // Clear password field after successful update
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You have been logged out.");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/${userID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ userID }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete account.");
        }

        localStorage.removeItem("userID");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Account deleted successfully.");

        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        console.error("Error deleting account:", err);
        alert("Failed to delete account. Please try again later.");
      }
    }
  };

  return (
    <div className="profile-container">
      <h1 className="logo">
        <a href="/">aura</a>
      </h1>
      <Button onClick={handleLogout}>logout</Button>
      <div className="profile-box">
        <h2>Welcome back {firstName}!</h2>
        <p>Change your profile details below:</p>
        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSubmit}>UPDATE</Button>
        </form>
        <p className="danger">
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

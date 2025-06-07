// src/components/Header.js
import React from "react";
import Button from "./Button"; // Assuming Button component is in the same folder
import "../styles/Header.css"; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="main-header">
      <h1 className="logo">
        <a href="/">aura</a>
      </h1>
      <Button onClick={() => (window.location.href = "/profile")}>
        my profile
      </Button>
    </header>
  );
};

export default Header;

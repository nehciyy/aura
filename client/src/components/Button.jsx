import React from "react";

const Button = ({ children, onClick, styleClass }) => {
  return (
    <button onClick={onClick} className={`button ${styleClass}`}>
      {children}
    </button>
  );
};

export default Button;

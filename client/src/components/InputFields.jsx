import React from "react";

const InputFields = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input"
      required
    />
  );
};

export default InputFields;

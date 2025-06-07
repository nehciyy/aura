import React from "react";
import "../styles/FileUploadSection.css";

const AudioDescription = ({ description, setDescription }) => {
  return (
    <div className="form-group">
      <label htmlFor="audioDescription">Description:</label>
      <textarea
        id="audioDescription"
        rows="4"
        placeholder="Enter a description for your audio file..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </div>
  );
};

export default AudioDescription;

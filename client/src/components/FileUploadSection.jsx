// src/components/FileUploadSection.js
import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer"; // Assuming AudioPlayer is in the same folder
import Button from "./Button"; // Assuming Button is in the same folder

const FileUploadSection = ({ onFileUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type immediately upon selection
      if (!file.type.startsWith("audio/")) {
        setMessage("Invalid file type. Please select an audio file.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setMessage("");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (
      event.dataTransfer.items &&
      event.dataTransfer.items.length > 0 &&
      event.dataTransfer.items[0].kind === "file"
    ) {
      setIsDragOver(true);
      setMessage("Drop your audio file here!");
    } else {
      setIsDragOver(false);
      setMessage("Only files can be dropped here.");
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
    setMessage("");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];
      if (!droppedFile.type.startsWith("audio/")) {
        setMessage(
          "Invalid file type. Please drop an audio file (e.g., .mp3, .wav)."
        );
        setSelectedFile(null);
        return;
      }
      setSelectedFile(droppedFile);
      setMessage("");
      // Optionally uncomment to auto-upload on drop
      // onFileUpload(droppedFile);
    } else {
      setMessage("No file dropped or invalid drop operation.");
    }
  };

  const onUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select an audio file to upload.");
      return;
    }

    // This check is duplicated with onFileChange and handleDrop, but good for robustness
    if (!selectedFile.type.startsWith("audio/")) {
      setMessage("Invalid file type. Please upload an audio file.");
      setSelectedFile(null);
      return;
    }

    setUploading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("audioFile", selectedFile);

    try {
      // --- Dummy Upload Simulation (Remove when using actual API) ---
      console.log("Simulating upload for:", selectedFile.name);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In a real app, response would contain details from backend
      // Call the success callback passed from HomePage
      onFileUploadSuccess({
        id: Date.now(), // Use a more robust ID in real app
        title: selectedFile.name,
        src: URL.createObjectURL(selectedFile), // Temporary URL
        category: "Uploaded",
        dateAdded: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        coverArt: "https://via.placeholder.com/100x100?text=New",
      });
      setMessage(`'${selectedFile.name}' uploaded successfully!`);
      setSelectedFile(null);
      // --- End Dummy Upload Simulation ---
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage(error.response?.data || "Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="upload-section">
      <div
        className={`upload-box-top ${isDragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label htmlFor="audio-upload" className="custom-file-input-label">
          Choose File
        </label>
        <input
          id="audio-upload"
          type="file"
          accept="audio/*"
          onChange={onFileChange}
        />
        {selectedFile ? (
          <span className="selected-file-name">{selectedFile.name}</span>
        ) : (
          <span className="selected-file-name">
            {isDragOver ? "Release to drop file" : "or drag & drop audio here"}
          </span>
        )}
        {selectedFile && (
          <AudioPlayer
            src={URL.createObjectURL(selectedFile)}
            title={selectedFile.name}
          />
        )}
      </div>
      <Button onClick={onUpload} disabled={uploading}>
        {uploading ? "uploading..." : "upload"}
      </Button>
      {message && <p className="upload-message">{message}</p>}
    </section>
  );
};

export default FileUploadSection;

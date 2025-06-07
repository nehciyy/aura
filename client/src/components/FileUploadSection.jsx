// src/components/FileUploadSection.jsx
import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import Button from "./Button";
import "../styles/FileUploadSection.css";

// Note: setCategories prop is no longer needed/passed
const FileUploadSection = ({ onFileUploadSuccess, existingCategories }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // States for description and category features
  const [description, setDescription] = useState("");
  // Initialize selectedCategory to the first item in existingCategories
  // or an empty string if existingCategories is not yet available/empty
  const [selectedCategory, setSelectedCategory] = useState(
    existingCategories && existingCategories.length > 0
      ? existingCategories[0]
      : ""
  );

  // --- REFINED useEffect FOR DEFAULT CATEGORY SELECTION (SIMPLIFIED) ---
  // This useEffect will now simply ensure a default is selected if not already
  useEffect(() => {
    if (
      existingCategories &&
      existingCategories.length > 0 &&
      !selectedCategory
    ) {
      setSelectedCategory(existingCategories[0]);
    }
  }, [existingCategories, selectedCategory]);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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
    } else {
      setMessage("No file dropped or invalid drop operation.");
    }
  };

  const handleCategoryChange = (event) => {
    // Simply update the selected category
    setSelectedCategory(event.target.value);
  };

  const onUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select an audio file to upload.");
      return;
    }
    if (!description.trim()) {
      setMessage("Please enter a description for the audio.");
      return;
    }
    // Ensure a category is selected (it won't be "addNew" anymore)
    if (!selectedCategory) {
      setMessage("Please select a category.");
      return;
    }

    setUploading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("audioFile", selectedFile);
    formData.append("description", description);
    formData.append("category", selectedCategory); // Directly use selectedCategory

    try {
      // --- Dummy Upload Simulation (Replace with actual API call) ---
      console.log(
        "Simulating upload for:",
        selectedFile.name,
        "with description:",
        description,
        "and category:",
        selectedCategory
      );
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate a successful response from the backend
      onFileUploadSuccess({
        id: Date.now(), // Unique ID for the new item
        title: selectedFile.name,
        src: URL.createObjectURL(selectedFile), // Temporary URL for playback
        category: selectedCategory, // Use the selected category
        description: description, // Use the description
        dateAdded: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        coverArt: "https://via.placeholder.com/100x100?text=New",
      });
      setMessage(`'${selectedFile.name}' uploaded successfully!`);

      // --- RESET ALL INPUTS AFTER SUCCESSFUL UPLOAD ---
      setSelectedFile(null);
      setDescription("");
      // Reset category to the first one available or empty
      setSelectedCategory(
        existingCategories && existingCategories.length > 0
          ? existingCategories[0]
          : ""
      );
      // Reset the file input element directly
      document.getElementById("audio-upload").value = "";

      // --- End Dummy Upload Simulation ---
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage(
        error.response?.data?.message ||
          "Error uploading file. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="upload-section">
      <h2>upload your audio</h2>
      <div className="upload-form">
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
              {isDragOver
                ? "Release to drop file"
                : "or drag & drop audio here"}
            </span>
          )}
          {selectedFile && (
            <AudioPlayer
              src={URL.createObjectURL(selectedFile)}
              title={selectedFile.name}
            />
          )}
        </div>

        {/* Description Input */}
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

        {/* Category Selection (Simplified) */}
        <div className="form-group">
          <label htmlFor="audioCategory">Category:</label>
          <select
            id="audioCategory"
            value={selectedCategory}
            onChange={handleCategoryChange}
            disabled={!existingCategories || existingCategories.length === 0} // Disable if no categories
          >
            {/* Show a disabled option if no categories are loaded, otherwise map existing */}
            {!existingCategories || existingCategories.length === 0 ? (
              <option value="" disabled>
                Loading Categories...
              </option>
            ) : (
              <>
                {/* Optional: Add a placeholder option if you want it initially empty */}
                <option value="" disabled hidden={selectedCategory !== ""}>
                  -- Select a Category --
                </option>
                {existingCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <Button
          onClick={onUpload}
          // Disabled if: uploading, no file, no description, or no category selected
          disabled={
            uploading ||
            !selectedFile ||
            !description.trim() ||
            !selectedCategory // Button is disabled if selectedCategory is empty
          }
        >
          {uploading ? "uploading..." : "upload"}
        </Button>
        {message && <p className="upload-message">{message}</p>}
      </div>
    </section>
  );
};

export default FileUploadSection;

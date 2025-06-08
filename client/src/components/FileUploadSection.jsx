// src/components/FileUploadSection.jsx
import React, { useState, useEffect } from "react";
import UploadAudioInput from "./UploadAudioInput";
import AudioDescription from "./AudioDescription";
import AudioCategory from "./AudioCategory";
import Button from "./Button";
import "../styles/FileUploadSection.css";

// Note: setCategories prop is no longer needed/passed
const FileUploadSection = ({ onFileUploadSuccess, existingCategories }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    existingCategories && existingCategories.length > 0
      ? existingCategories[0]
      : ""
  );

  useEffect(() => {
    if (
      existingCategories &&
      existingCategories.length > 0 &&
      !selectedCategory
    ) {
      setSelectedCategory(existingCategories[0]);
    }
  }, [existingCategories, selectedCategory]);

  // Handle file upload logic
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
      const response = await fetch("/api/audio/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      console.log("Response status:", response); // Log the response status
      if (!response.ok) throw new Error("Upload failed. Please try again.");

      const newFile = await response.json();
      onFileUploadSuccess(newFile); // Call the success callback with the new file data
      setSelectedFile(null);
      setDescription("");
      setSelectedCategory(existingCategories[0] || "");
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="upload-section">
      <h2>upload your audio</h2>
      <div className="upload-form">
        {/* Render the new UploadAudioInput component */}
        <UploadAudioInput
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setMessage={setMessage}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
        />

        {/* Render the new AudioDescription component */}
        <AudioDescription
          description={description}
          setDescription={setDescription}
        />

        {/* Render the new AudioCategory component */}
        <AudioCategory
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          existingCategories={existingCategories}
        />

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

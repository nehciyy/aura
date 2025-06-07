// src/components/FileUploadSection.jsx
import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
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
          setSelectedCategory={setSelectedCategory}
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

import React from "react";
import AudioPlayer from "./AudioPlayer";
import "../styles/FileUploadSection.css";

const UploadAudioInput = ({
  selectedFile,
  setSelectedFile,
  setMessage,
  isDragOver,
  setIsDragOver,
}) => {
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

  return (
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
  );
};

export default UploadAudioInput;

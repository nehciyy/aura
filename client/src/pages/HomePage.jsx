import React, { useState, useEffect, useMemo } from "react";
import AudioPlayer from "../components/AudioPlayer";
import Button from "../components/Button";
import "../styles/HomePage.css";

const HomePage = () => {
  const [audioFiles, setAudioFiles] = useState([
    {
      id: 1,
      title: "podcast1.mp4",
      src: "/audio/podcast1.mp4",
      category: "podcast",
      dateAdded: "06/01/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Audio",
    },
    {
      id: 2,
      title: "podcast2.mp4",
      src: "/audio/podcast2.mp4",
      category: "podcast",
      dateAdded: "06/02/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Audio",
    },
    {
      id: 3,
      title: "song3.mp3",
      src: "/audio/song3.mp3",
      category: "music",
      dateAdded: "06/03/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Music",
    },
    {
      id: 4,
      title: "interview.wav",
      src: "/audio/interview.wav",
      category: "interview",
      dateAdded: "06/04/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Talk",
    },
    {
      id: 5,
      title: "another_song.mp3",
      src: "/audio/another_song.mp3",
      category: "music",
      dateAdded: "05/28/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Music",
    },
    {
      id: 6,
      title: "tech_podcast.mp4",
      src: "/audio/tech_podcast.mp4",
      category: "podcast",
      dateAdded: "06/05/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Audio",
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("dateAddedDesc");
  const [searchTerm, setSearchTerm] = useState("");

  const [isDragOver, setIsDragOver] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(audioFiles.map((file) => file.category));
    return ["all", ...Array.from(uniqueCategories)].sort();
  }, [audioFiles]);

  const displayedAudioFiles = useMemo(() => {
    let filtered = audioFiles;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "dateAddedDesc") {
        const dateA = new Date(a.dateAdded.split("/").reverse().join("-"));
        const dateB = new Date(b.dateAdded.split("/").reverse().join("-"));
        return dateB.getTime() - dateA.getTime();
      } else if (sortBy === "dateAddedAsc") {
        const dateA = new Date(a.dateAdded.split("/").reverse().join("-"));
        const dateB = new Date(b.dateAdded.split("/").reverse().join("-"));
        return dateA.getTime() - dateB.getTime();
      } else if (sortBy === "titleAsc") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "titleDesc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    return sorted;
  }, [audioFiles, filterCategory, sortBy, searchTerm]);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage("");
    }
  };

  const onFileUpload = async (fileToUpload = selectedFile) => {
    if (!fileToUpload) {
      setMessage("Please select an audio file to upload.");
      return;
    }

    // Basic check for audio file type before upload
    if (!fileToUpload.type.startsWith("audio/")) {
      setMessage("Invalid file type. Please upload an audio file.");
      setSelectedFile(null); // Clear invalid file
      return;
    }

    setUploading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("audioFile", fileToUpload);

    try {
      // --- Dummy Upload Simulation (Remove when using actual API) ---
      console.log("Simulating upload for:", fileToUpload.name);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newDummyAudio = {
        id: audioFiles.length + 1,
        title: fileToUpload.name,
        src: URL.createObjectURL(fileToUpload),
        category: "Uploaded",
        dateAdded: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        coverArt: "https://via.placeholder.com/100x100?text=New",
      };
      setAudioFiles((prev) => [...prev, newDummyAudio]);
      setMessage(`'${fileToUpload.name}' uploaded successfully!`);
      setSelectedFile(null);
      // --- End Dummy Upload Simulation ---
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage(error.response?.data || "Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Essential to allow drop
    // Check if there are items being dragged and if they are files (not text, links, etc.)
    if (
      event.dataTransfer.items &&
      event.dataTransfer.items.length > 0 &&
      event.dataTransfer.items[0].kind === "file"
    ) {
      setIsDragOver(true);
      setMessage("Drop your audio file here!");
    } else {
      setIsDragOver(false); // Not a file drag, don't show drag-over style
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

      // **** IMPORTANT: Added file type validation here ****
      if (!droppedFile.type.startsWith("audio/")) {
        setMessage(
          "Invalid file type. Please drop an audio file (e.g., .mp3, .wav)."
        );
        setSelectedFile(null); // Clear any previously selected file if invalid drop occurs
        return;
      }

      setSelectedFile(droppedFile);
      setMessage("");
      // Uncomment the line below if you want to automatically upload on drop
      // onFileUpload(droppedFile);
    } else {
      setMessage("No file dropped or invalid drop operation.");
    }
  };

  return (
    <div className="homepage-container">
      <header className="main-header">
        <h1 className="logo">aura</h1>
        <Button onClick={() => (window.location.href = "/profile")}>
          my profile
        </Button>
      </header>

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
        <Button onClick={() => onFileUpload()} disabled={uploading}>
          {uploading ? "uploading..." : "upload"}
        </Button>
        {message && <p className="upload-message">{message}</p>}
      </section>

      <section className="audio-display-section">
        <div className="controls-bar">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all"
                  ? "All Categories"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="dateAddedDesc">Date Added (Latest)</option>
            <option value="dateAddedAsc">Date Added (Oldest)</option>
            <option value="titleAsc">Title (A-Z)</option>
            <option value="titleDesc">Title (Z-A)</option>
          </select>
        </div>

        <table className="audio-table">
          <thead>
            <tr>
              <th>audio</th>
              <th>category</th>
              <th>date added</th>
            </tr>
          </thead>
          <tbody>
            {displayedAudioFiles.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No audio files found.
                </td>
              </tr>
            ) : (
              displayedAudioFiles.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="audio-item-cell">
                      <span>{item.title}</span>
                      <AudioPlayer src={item.src} title={item.title} />
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.dateAdded}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default HomePage;

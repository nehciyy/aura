import React, { useState, useEffect, useMemo } from "react"; // Added useMemo
import AudioPlayer from "../components/AudioPlayer"; // Assuming this is your custom audio player
import Button from "../components/Button"; // Assuming this is your custom button component
import "../styles/HomePage.css"; // Import your CSS styles for this page

const HomePage = () => {
  // Dummy data to simulate fetched audio files, now with more details
  const [audioFiles, setAudioFiles] = useState([
    {
      id: 1,
      title: "podcast1.mp4",
      src: "/audio/podcast1.mp4", // This needs to be a valid path if local, or a backend served path
      category: "podcast",
      dateAdded: "06/01/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Audio",
    },
    {
      id: 2,
      title: "podcast2.mp4",
      src: "/audio/podcast2.mp4",
      category: "podcast",
      dateAdded: "06/02/2025", // Changed date for sorting test
      coverArt: "https://via.placeholder.com/100x100?text=Audio",
    },
    {
      id: 3,
      title: "song3.mp3",
      src: "/audio/song3.mp3",
      category: "music",
      dateAdded: "06/03/2025", // Changed date for sorting test
      coverArt: "https://via.placeholder.com/100x100?text=Music",
    },
    {
      id: 4,
      title: "interview.wav",
      src: "/audio/interview.wav",
      category: "interview",
      dateAdded: "06/04/2025", // Changed date for sorting test
      coverArt: "https://via.placeholder.com/100x100?text=Talk",
    },
    {
      id: 5,
      title: "another_song.mp3",
      src: "/audio/another_song.mp3",
      category: "music",
      dateAdded: "05/28/2025", // Older date for sorting test
      coverArt: "https://via.placeholder.com/100x100?text=Music",
    },
    {
      id: 6,
      title: "tech_podcast.mp4",
      src: "/audio/tech_podcast.mp4",
      category: "podcast",
      dateAdded: "06/05/2025", // Latest date
      coverArt: "https://via.placeholder.com/100x100?text=Audio",
    },
  ]);

  // State for file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // New states for filtering, sorting, and searching
  const [filterCategory, setFilterCategory] = useState("all"); // 'all' for no filter
  const [sortBy, setSortBy] = useState("dateAddedDesc"); // 'dateAddedDesc', 'dateAddedAsc', 'titleAsc', 'titleDesc'
  const [searchTerm, setSearchTerm] = useState("");

  // Derive unique categories from your audioFiles data
  const categories = useMemo(() => {
    const uniqueCategories = new Set(audioFiles.map((file) => file.category));
    return ["all", ...Array.from(uniqueCategories)].sort();
  }, [audioFiles]);

  // Use useMemo to filter and sort audio files efficiently
  const displayedAudioFiles = useMemo(() => {
    let filtered = audioFiles;

    // 1. Apply Search Filter
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Apply Category Filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    // 3. Apply Sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "dateAddedDesc") {
        // Assuming dateAdded is MM/DD/YYYY, convert to YYYY-MM-DD for comparison
        const dateA = new Date(a.dateAdded.split("/").reverse().join("-"));
        const dateB = new Date(b.dateAdded.split("/").reverse().join("-"));
        return dateB.getTime() - dateA.getTime(); // Latest date first
      } else if (sortBy === "dateAddedAsc") {
        const dateA = new Date(a.dateAdded.split("/").reverse().join("-"));
        const dateB = new Date(b.dateAdded.split("/").reverse().join("-"));
        return dateA.getTime() - dateB.getTime(); // Oldest date first
      } else if (sortBy === "titleAsc") {
        return a.title.localeCompare(b.title); // A-Z
      } else if (sortBy === "titleDesc") {
        return b.title.localeCompare(a.title); // Z-A
      }
      return 0; // No specific sort
    });

    return sorted;
  }, [audioFiles, filterCategory, sortBy, searchTerm]);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage("");
  };

  const onFileUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select an audio file to upload.");
      return;
    }

    setUploading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("audioFile", selectedFile);

    try {
      // --- Dummy Upload Simulation (Remove when using actual API) ---
      console.log("Simulating upload for:", selectedFile.name);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      const newDummyAudio = {
        id: audioFiles.length + 1,
        title: selectedFile.name,
        src: URL.createObjectURL(selectedFile),
        category: "Uploaded", // Default category for dummy
        dateAdded: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        coverArt: "https://via.placeholder.com/100x100?text=New",
      };
      setAudioFiles((prev) => [...prev, newDummyAudio]);
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
    <div className="homepage-container">
      <header className="main-header">
        <h1 className="logo">aura</h1>
        <Button onClick={() => (window.location.href = "/profile")}>
          my profile
        </Button>
      </header>

      <section className="upload-section">
        <div className="upload-box-top">
          {/* Label acts as the custom file input button */}
          <label htmlFor="audio-upload" className="custom-file-input-label">
            Choose File
          </label>
          <input
            id="audio-upload"
            type="file"
            accept="audio/*"
            onChange={onFileChange}
          />
          {/* Display selected file name if available */}
          {selectedFile && (
            <span className="selected-file-name">{selectedFile.name}</span>
          )}
          {/* Using AudioPlayer for the preview as per the image */}
          {selectedFile && (
            <AudioPlayer
              src={URL.createObjectURL(selectedFile)}
              title={selectedFile.name}
            />
          )}
        </div>
        <Button onClick={onFileUpload} disabled={uploading}>
          {uploading ? "uploading..." : "upload"}
        </Button>
        {message && <p className="upload-message">{message}</p>}
      </section>

      <section className="audio-display-section">
        <div className="controls-bar">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          {/* Category Filter */}
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

          {/* Sort By */}
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
              <th>song</th>
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

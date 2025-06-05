import React, { useState, useEffect } from "react";
import AudioPlayer from "../components/AudioPlayer"; // Assuming this is your custom audio player
import Button from "../components/Button"; // Assuming this is your custom button component
import "../styles/HomePage.css"; // Import your CSS styles for this page
// import axios from 'axios'; // You'll need this for actual API calls later

const HomePage = () => {
  // Dummy data to simulate fetched audio files, now with more details
  const [audioFiles, setAudioFiles] = useState([
    {
      id: 1,
      title: "podcast1.mp4",
      src: "/audio/podcast1.mp4", // This needs to be a valid path if local, or a backend served path
      category: "podcast",
      dateAdded: "06/01/2025",
      // In a real app, this would be fetched from backend or a default image
      coverArt: "https://via.placeholder.com/100x100?text=Audio",
    },
    {
      id: 2,
      title: "podcast2.mp4",
      src: "/audio/podcast2.mp4",
      category: "podcast",
      dateAdded: "06/01/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Audio",
    },
    {
      id: 3,
      title: "song3.mp3",
      src: "/audio/song3.mp3",
      category: "music",
      dateAdded: "06/01/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Music",
    },
    {
      id: 4,
      title: "interview.wav",
      src: "/audio/interview.wav",
      category: "interview",
      dateAdded: "06/01/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Talk",
    },
  ]);

  // State for file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // // --- Placeholder for Actual API Calls (Uncomment and implement later) ---
  // const fetchAudioFiles = async () => {
  //     try {
  //         // Replace with your actual backend endpoint for fetching audio
  //         const response = await axios.get('http://localhost:5000/api/audio');
  //         setAudioFiles(response.data.map(audio => ({
  //             id: audio._id,
  //             title: audio.originalname,
  //             src: `http://localhost:5000/uploads/${audio.filename}`, // Adjust based on your backend serving
  //             category: 'Uncategorized', // You might need a category field in your schema in MongoDB
  //             dateAdded: new Date(audio.uploadDate).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  //             coverArt: 'https://via.placeholder.com/100x100?text=Audio', // Placeholder
  //         })));
  //     } catch (error) {
  //         console.error('Error fetching audio files:', error);
  //         setMessage('Error fetching audio files.');
  //     }
  // };

  // useEffect(() => {
  //     fetchAudioFiles(); // Fetch audio files on component mount
  // }, []);

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
      // Replace with your actual backend upload endpoint
      // const response = await axios.post('http://localhost:5000/api/upload', formData, {
      //     headers: {
      //         'Content-Type': 'multipart/form-data',
      //     },
      // });
      // setMessage(response.data.message);
      // setSelectedFile(null); // Clear selected file
      // fetchAudioFiles(); // Refresh list

      // --- Dummy Upload Simulation (Remove when using actual API) ---
      console.log("Simulating upload for:", selectedFile.name);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      const newDummyAudio = {
        id: audioFiles.length + 1,
        title: selectedFile.name,
        // For dummy, we create an object URL; for real, it's from backend's static serve
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
        {/* Your table structure, but with dynamic data */}
        <table className="audio-table">
          <thead>
            <tr>
              <th>song</th>
              <th>category</th>
              <th>date added</th>
            </tr>
          </thead>
          <tbody>
            {audioFiles.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No audio files available.
                </td>
              </tr>
            ) : (
              audioFiles.map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* Display title and use AudioPlayer for playback */}
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

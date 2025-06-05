// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header"; // Import new Header component
import FileUploadSection from "../components/FileUploadSection"; // Import new FileUploadSection
import AudioTable from "../components/AudioTable"; // Import new AudioTable
import "../styles/HomePage.css"; // Keep general layout styles

const HomePage = () => {
  // Main state for all audio files (this is now the single source of truth)
  const [audioFiles, setAudioFiles] = useState([
    {
      id: 1,
      title: "podcast1.mp4",
      src: "/audio/podcast1.mp2",
      category: "podcast",
      dateAdded: "06/01/2025",
      coverArt: "https://via.placeholder.com/100x100?text=Audio",
    },
    {
      id: 2,
      title: "podcast2.mp4",
      src: "/audio/podcast2.mp2",
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

  // This function is passed to FileUploadSection to update audioFiles
  const handleFileUploadSuccess = (newAudioItem) => {
    setAudioFiles((prev) => [...prev, newAudioItem]);
  };

  // Optional: Uncomment and implement this useEffect for actual API calls
  // useEffect(() => {
  //   const fetchAudioFiles = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/audio');
  //       setAudioFiles(response.data.map(audio => ({
  //           id: audio._id,
  //           title: audio.originalname,
  //           src: `http://localhost:5000/uploads/${audio.filename}`,
  //           category: audio.category || 'Uncategorized', // Ensure category exists
  //           dateAdded: new Date(audio.uploadDate).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  //           coverArt: 'https://via.placeholder.com/100x100?text=Audio',
  //       })));
  //     } catch (error) {
  //       console.error('Error fetching audio files:', error);
  //       // You might want to pass error message up to FileUploadSection or handle locally
  //     }
  //   };
  //   fetchAudioFiles();
  // }, []);

  return (
    <div>
      <Header />
      <FileUploadSection onFileUploadSuccess={handleFileUploadSuccess} />
      <AudioTable audioFiles={audioFiles} />
    </div>
  );
};

export default HomePage;

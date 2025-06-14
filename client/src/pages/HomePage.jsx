import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import FileUploadSection from "../components/FileUploadSection";
import AudioTable from "../components/AudioTable";
import "../styles/HomePage.css";

const FIXED_CATEGORIES = [
  "podcast",
  "music",
  "interview",
  "lecture",
  "news",
  "comedy",
  "scenery",
  "lo-fi",
  "rock",
  "pop",
  "jazz",
  "others",
];

const API_BASE_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
  const navigate = useNavigate();
  const [audioFiles, setAudioFiles] = useState([]);

  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");

  console.log("homepage userid and token", userID, token);

  useEffect(() => {
    if (!userID || !token) {
      navigate("/login");
    }

    const fetchAudioFiles = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/audio/user/${userID}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //for local development
        // const mapped = response.data.map((audio) => {
        //   const cleanSrc = audio.src.startsWith("/uploads/")
        //     ? audio.src.substring("/uploads/".length)
        //     : audio.src;
        //   return {
        //     ...audio,
        //     src: `${API_BASE_URL}/uploads/${cleanSrc}`,
        //   };
        // });

        const mapped = response.data.map((audio) => {
          let finalSrc = audio.src;
          if (
            !audio.src.startsWith("http://") &&
            !audio.src.startsWith("https://")
          ) {
            finalSrc = `${API_BASE_URL}${audio.src}`;
          }
          return {
            ...audio,
            src: finalSrc,
          };
        });

        setAudioFiles(mapped);
      } catch (error) {
        console.error("Error fetching audio files:", error);
      }
    };

    fetchAudioFiles();
  }, [userID, token, navigate]);

  const handleFileUploadSuccess = (newAudioItem) => {
    setAudioFiles((prev) => [...prev, newAudioItem]);
  };

  return (
    <div>
      <Header />
      <FileUploadSection
        onFileUploadSuccess={handleFileUploadSuccess}
        existingCategories={FIXED_CATEGORIES}
      />
      <AudioTable audioFiles={audioFiles} />
    </div>
  );
};

export default HomePage;

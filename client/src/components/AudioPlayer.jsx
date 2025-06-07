import React from "react";
import "../styles/AudioPlayer.css";

const AudioPlayer = ({ src, title }) => {
  return (
    <div className="audio-player-container">
      {/* <p className="audio-player-title">{title}</p> // Optional: display title above player */}
      <audio controls>
        <source src={src} type="audio/mpeg" />{" "}
        {/* Default to mpeg, adjust type if needed */}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;

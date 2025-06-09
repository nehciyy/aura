import React from "react";
import "../styles/AudioPlayer.css";

const AudioPlayer = ({ src, title }) => {
  return (
    <div className="audio-player-container">
      <audio controls>
        <source src={src} type="audio/mpeg" />
        <source src={src.replace(".mp3", ".ogg")} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;

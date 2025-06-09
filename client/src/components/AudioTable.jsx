import React, { useState, useMemo } from "react";
import AudioPlayer from "./AudioPlayer";
import "../styles/AudioTable.css";

const MAX_TITLE_LENGTH = 30;

const trimText = (text, maxLen) =>
  text.length > maxLen ? text.slice(0, maxLen - 3) + "..." : text;

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
};

const AudioTable = ({ audioFiles }) => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("dateAddedDesc");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(() => {
    const unique = new Set(audioFiles.map((file) => file.category));
    return ["all", ...Array.from(unique).filter(Boolean)].sort();
  }, [audioFiles]);

  const displayedAudioFiles = useMemo(() => {
    let filtered = audioFiles;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.filename.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "dateAddedDesc") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "dateAddedAsc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "titleAsc") {
        return a.filename.localeCompare(b.filename);
      } else if (sortBy === "titleDesc") {
        return b.filename.localeCompare(a.filename);
      }
      return 0;
    });

    return sorted;
  }, [audioFiles, filterCategory, sortBy, searchTerm]);

  return (
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
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all"
                ? "All Categories"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
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
            <th>song</th>
            <th>description</th>
            <th>category</th>
            <th>date added</th>
          </tr>
        </thead>
        <tbody>
          {displayedAudioFiles.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No audio files found.
              </td>
            </tr>
          ) : (
            displayedAudioFiles.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="audio-item-cell">
                    <span title={item.filename}>
                      {trimText(item.filename, MAX_TITLE_LENGTH)}
                    </span>
                    <AudioPlayer src={item.src} title={item.filename} />
                  </div>
                </td>
                <td>{item.description || "–"}</td>
                <td>{item.category || "–"}</td>
                <td>{formatDate(item.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default AudioTable;

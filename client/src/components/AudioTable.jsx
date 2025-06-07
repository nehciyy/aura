// src/components/AudioTable.js
import React, { useState, useMemo } from "react";
import AudioPlayer from "./AudioPlayer"; // Assuming AudioPlayer is in the same folder
import "../styles/AudioTable.css"; // Create a CSS file for this component

const AudioTable = ({ audioFiles }) => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("dateAddedDesc");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(audioFiles.map((file) => file.category));
    return ["all", ...Array.from(uniqueCategories)].sort();
  }, [audioFiles]);

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

  return (
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
            <th>description</th>
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
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.dateAdded}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default AudioTable;

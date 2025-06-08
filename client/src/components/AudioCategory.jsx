import React from "react";
import "../styles/FileUploadSection.css";

const AudioCategory = ({
  selectedCategory,
  onCategoryChange,
  existingCategories,
}) => {
  const handleCategoryChange = (event) => {
    onCategoryChange(event.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor="audioCategory">Category:</label>
      <select
        id="audioCategory"
        value={selectedCategory}
        onChange={handleCategoryChange}
        disabled={!existingCategories || existingCategories.length === 0} // Disable if no categories
      >
        {/* Show a disabled option if no categories are loaded, otherwise map existing */}
        {!existingCategories || existingCategories.length === 0 ? (
          <option value="" disabled>
            Loading Categories...
          </option>
        ) : (
          <>
            {/* Optional: Add a placeholder option if you want it initially empty */}
            <option value="" disabled hidden={selectedCategory !== ""}>
              -- Select a Category --
            </option>
            {existingCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default AudioCategory;

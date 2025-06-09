const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80; // Default to port 80

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "build")));

// For any other requests, serve the main index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Client static server listening on port ${port}`);
  console.log(`Access your React app at http://localhost:${port}`);
});

const express = require("express");
const app = express();

// ✅ Allow JSON data in requests
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Home route
app.get("/", (req, res) => {
  res.send("✅ Node.js backend is running on Render!");
});

// ✅ Example API route
app.get("/api/info", (req, res) => {
  res.json({
    success: true,
    message: "This is your first API from Render!",
    time: new Date().toLocaleString(),
  });
});

// ✅ POST route (receive data)
app.post("/api/send", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  console.log(`[${new Date().toLocaleTimeString()}] Data received:`, { name, message });

  res.json({
    success: true,
    received: { name, message },
    serverTime: new Date().toLocaleString(),
  });
});

// ✅ Dynamic port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


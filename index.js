const express = require("express");
const app = express();

// ✅ Allow JSON data in requests
app.use(express.json());

// ✅ Home route
app.get("/", (req, res) => {
  res.send("✅ Node.js backend is running in Termux!");
});

// ✅ Example API route
app.get("/api/info", (req, res) => {
  res.json({
    success: true,
    message: "This is your first API from Termux!",
    time: new Date().toLocaleString(),
  });
});

// ✅ POST route (receive data)
app.post("/api/send", (req, res) => {
  const { name, message } = req.body;
  console.log(`[${new Date().toLocaleTimeString()}] Data received:`, req.body);

  if (!name || !message) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  res.json({
    success: true,
    reply: `Hi ${name}! You said: "${message}"`,
  });
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} — ${new Date().toLocaleTimeString()}`);
});

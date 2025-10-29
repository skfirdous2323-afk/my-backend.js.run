import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// 🔧 Render automatically provides PORT — always use it
const PORT = process.env.PORT || 10000;

// ✅ Root route (so Render doesn’t show “Not Found”)
app.get("/", (req, res) => {
  res.send("✅ Shopify Backend is Live on Render!");
});

// 🛍️ Orders route
app.get("/orders", async (req, res) => {
  try {
    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-10/orders.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

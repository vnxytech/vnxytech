// server.js
const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const { startBot, getStatus, onLog } = require("./bot/whatsapp2");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve UI
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/start", (req, res) => {
  startBot(io); // kirim io ke bot
  res.json({ message: "Bot is starting..." });
});

app.get("/api/status", (req, res) => {
  res.json(getStatus());
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Panel: http://localhost:${PORT}`);
});
